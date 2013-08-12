/**
 * @module events
 *  Description:
 *    add support (to any object or class) by mixing this class into your own
 *
 *  Requires prototype.js
 *
 *  Usage:
 *    To publish custom events:
 *      1. mix this class with your own via
 *         Object.extend( [your class or prototype], Event.Publisher )
 *      2. post events by calling
 *         this.dispatchEvent( [event name], [data for event] )
 *
 *    To activate and deactivate the event-tracing feature, just call
 *      this.toggleEventsTrace()
 **/

Event.Publisher = Class.create({
    eventTargets: null,

    eventSourceId: null,

    getEventSourceId: function () {
        return (typeof this.eventSourceId == 'function') ? this.eventSourceId() : this.eventSourceId;
    },

    getEventTarget: function (eventName) {
        this.eventTargets = this.eventTargets || [];

        if (!this.eventTargets[eventName]) document.body.appendChild(this.eventTargets[eventName] = document.createElement('A'));

        return this.eventTargets[eventName];
    },

    addEventListener: function (eventName, callbackFunc, capturing) {
        Event.observe(this.getEventTarget(eventName), 'click', callbackFunc);
    },

    removeEventListener: function (eventName, callbackFunc, capturing) {
        Event.stopObserving(this.getEventTarget(eventName), 'click', callbackFunc);
    },

    dispatchEvent: function (eventName, data, canBubble, cancelable) {
        Event.create({
            eventName: eventName,
            eventTarget: this,
            data: data ? data : null
        }, canBubble || false , cancelable || false, true, this.getEventTarget(eventName));
    }
});

/**
 *  MIX IN: Event.Listener
 *
 *  Description:
 *    easily add support for receiving totally custom events
 *    (to any object or class) by mixing this class into
 *    your own
 *
 *  Usage:
 *       To receive custom events:
 *      1. mix this class with your own via
 *         Object.extend( [your class or prototype], EventListener )
 *      2. listen for events by calling (from your object)
 *         this.listen()
 *         (see params for this.listen, below)
 **/
Event.Listener = Class.create({
    listens: null,

    getEventHandlerName: function (eventName) {
        var onEventName = eventName.split(/[ _]/).join('-').camelize();

        return "on" + onEventName.charAt(0).toUpperCase() + onEventName.substr(1);
    },

    /**
     *     Params:
     *    eventSource [object]:
     *      the object which will generate the events, and which implements (or
     *      mixes in) the Event.Publisher interface (we need addEventListener)
     *    eventName [string]:
     *      the name of the event for which your object will listen
     *    useCapture [boolean]:
     *      standard DOM Event API param
     *    onEventName [string]:
     *      the name of the method in your object which will be called when the
     *      event is received if you omit this param, listen will look for a
     *      function named with the CapitalizedCamelCased name of the event with
     *      "on" at the front. So, if the event is named "message_received",
     *      we'll look for a function named "onMessageReceived" You can override
     *      this behavior by overriding getEventHandlerName in your object.
     **/
    listenForEvent: function (eventSource, eventName, useCapture, onEventName) {
        onEventName = onEventName || this.getEventHandlerName(eventName);
        this.listens = this.listens || [];

        var cb = this[onEventName].bindAsEventListener(this);
        this.listens.push([eventSource, eventName, useCapture, onEventName, cb]);
        eventSource.addEventListener(eventName, cb, useCapture);
    },

    stopListeningForEvent: function (eventSource, eventName, useCapture, onEventName) {
        if (!this.listens) return false;

        onEventName = onEventName || this.getEventHandlerName(eventName);

        var ixItem = -1;
        var ls = this.listens.detect(function (val, ix) {
            if ((val[0] == eventSource) && (val[1] == eventName) && (val[2] == useCapture) && (val[3] == onEventName)) {
                ixItem = ix;
                return true;
            }

            return false;
        });

        if (ixItem >= 0) {
            this.listens.splice(ixItem, 1);

            eventSource.removeEventListener(eventName, ls[4], useCapture);

            return true;
        }

        return false;
    }
});

/**
 *  Extensions to Prototype's Event object,
 *  for cleanly creating and dispatching custom events
 *
 *  Called from Event.Publisher
 **/
Object.extend(Event, {
    create: function (eventData, canBubble, cancelable, flDispatch, target) {
        var event;

        if (document.createEvent) {  // gecko, safari
            canBubble = canBubble || false;
            cancelable = cancelable || false;

            if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
                event = document.createEvent('HTMLEvents');
                event.initEvent('click', canBubble, cancelable);
            } else {  // gecko uses MouseEvents
                event = document.createEvent('MouseEvents');
                event.initMouseEvent("click", canBubble, cancelable,
                    window, 0, 0, 0, 0, 0,
                    false, false, false, false, 0, null);
            }
        } else {  // msie
            event = document.createEventObject();
            event.eventType = 'onclick';
        }

        event.eventData = eventData;

        if (flDispatch) Event.dispatch(target, event);

        return event;
    },

    dispatch: function (target, event) {
        return document.createEvent
            ? target.dispatchEvent(event)
            : target.fireEvent(( typeof(event.eventType) != 'undefined' ) ? event.eventType : 'onclick', event)
    }
});

/**
 *  MIX IN: Event.Broker
 *  (c) 2006 Seth Dillingham <seth.dillingham@gmail.com>
 *
 *  This software is hereby released into the public domain. Do with it as
 *  you please, but with the understanding that it is provided "AS IS" and
 *  without any warranty of any kind.
 *
 *  (But I'd love to be told about where and how this code is being used.)
 **/

/**
 *  Description:
 *    Allows listeners to subscribe to event types, and remain
 *    blissfully unaware of the available publishers of those events
 *
 *  Requires prototype.js
 *
 *  Usage:
 *    You'll usually want to create a copy of the Broker object by mixing
 *      it in with one of your own classes as follows:
 *      Object.extend( your_obj, Event.Broker )
 *
 *    Publishers register the event types they send with a call to
 *      your_broker_object.registerEventsPublisher
 *      and "unregister" via your_broker_object.unregisterEventsPublisher
 *
 *    Nothing changes for the event listeners, except they call their
 *      listen() method once for each event type (passing a reference
 *      to the broker) instead of once per event type per publisher
 **/

Event.Broker = Class.create({
    listeners: null,

    publishers: null,

    initListenerType: function (eventType) {
        if (this.listeners == null) this.listeners = {};

        if (typeof(this.listeners[eventType]) == 'undefined') this.listeners[eventType] = [];
    },

    initPublisherType: function (eventType) {
        if (this.publishers == null) this.publishers = {};
        if (this.publishers[eventType] == undefined) this.publishers[eventType] = [];
    },

    /**
     *  Register a publisher with the broker. Listeners that want the types
     *  of events produced by this publisher will be subscribed automatically.
     *
     *  Params:
     *    eventTypes: an event type, or an arry of event types,
     *      which are published by the publisher
     *    publisher: the publisher object being registered with the broker
     *      (must mix in Event.Publisher, or implement the same public interface)
     **/
    registerEventsPublisher: function (eventTypes, publisher) {
        if (typeof(eventTypes) != typeof([])) eventTypes = [eventTypes];

        eventTypes.each(function (eventType) {
            this.initPublisherType(eventType);
            this.publishers[eventType].push(publisher);
            this.initListenerType(eventType);
            this.listeners[eventType].each(function (listenerRec) {
                publisher.addEventListener(eventType, listenerRec.listener, listenerRec.useCapture);
            });
        }.bind(this));
    },

    /**
     *  Unregister a publisher with the broker. Listeners that had been
     *  automatically subscribed to the publisher will be un-subscribed.
     *
     *  Params:
     *    eventTypes: an event type, or an arry of event types,
     *      which are published by the publsher
     *    publisher: the publisher object being un-registered with the broker
     **/
    unregisterEventsPublisher: function (eventTypes, publisher) {
        if (typeof(eventTypes) != typeof([])) eventTypes = [eventTypes];

        eventTypes.each(function (eventType) {
            this.listeners[eventType].each(function (listenerRec) {
                publisher.removeEventListener(eventType, listenerRec.listener, listenerRec.useCapture);
            });

            var ix = this.publishers[eventType].indexOf(publisher);

            if (ix > -1) this.publishers[eventType].splice(ix, 1);
        }.bind(this));
    },

    /**
     *  Register a listener with the broker. Causes the listener
     *  to be automatically registered with all publishers that produce
     *  the specified eventType.
     *
     *  You shouldn't have to  call this from your own code: it's
     *  called automatically when your listener listens for events
     *  from the broker.
     *
     *  See Event.Listener.listenForEvent
     **/
    addEventListener: function (eventType, eventListener, useCapture) {
        this.initListenerType(eventType);
        this.listeners[eventType].push({
            listener: eventListener,
            useCapture: useCapture
        });

        this.initPublisherType(eventType);

        this.publishers[ eventType ].each(function (publisher) {
            publisher.addEventListener(eventType, eventListener, useCapture);
        });
    },

    /**
     *  Un-register a listener with the broker. The listener is
     *  "unsubscribed" from all publishers of the given eventType
     *
     *  You shouldn't have to  call this from your own code: it's
     *  called automatically when your listener stops listening
     *  for events from the broker.
     *
     *  See Event.Listener.stopListeningForEvent
     **/
    removeEventListener: function (eventType, eventListener, useCapture) {
        this.publishers[eventType].each(function (publisher) {
            publisher.removeEventListener(eventType, eventListener, useCapture);
        });

        var ixListener = -1;

        this.listeners[eventType].each(function (listenerRec, ix) {
            ixListener = ix;
            throw $break;
        });

        if (ixListener > -1) this.listeners[eventType].splice(ixListener, 1);
    }
});