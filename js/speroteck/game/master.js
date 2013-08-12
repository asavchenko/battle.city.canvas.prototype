Speroteck.Game.Master = Class.create(Event.Listener, {
    /**
     *
     */
    board: undefined,

    /**
     * @constructor
     * @param options
     */
    initialize: function (options) {
        options = options || {};
        this.board = options.board;
        this.subscribeOnTankEvents();
    },

    /**
     *
     */
    subscribeOnTankEvents: function() {
        if (typeof this.board === 'object') {
            this.listenForEvent(this.board, 'tank_move_up');

            this.listenForEvent(this.board, 'tank_move_left');

            this.listenForEvent(this.board, 'tank_move_down');

            this.listenForEvent(this.board, 'tank_move_right');
        }
    },

    onTankMoveUp: function(event) {
        console.log(event);
        console.log('tank is moving up');
    },

    onTankMoveLeft: function(event) {
        console.log(event);
        console.log('tank is moving left');
    },

    onTankMoveDown: function(event) {
        console.log(event);
        console.log('tank is moving down');
    },

    onTankMoveRight: function(event) {
        console.log(event);
        console.log('tank is moving right');
    }
});