/**
 * QuadTree implementation
 *
 * @category     Speroteck
 * @package      Speroteck_QuadTree
 * @copyright    Copyright (c)  Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

Speroteck.QuadNode = Class.create({
    /**
     *
     */
    objects: [],

    /**
     *
     */
    nodes: [],

    /**
     *
     */
    parent: undefined,

    /**
     *
     */
    left: 0,        eLeft:    undefined,

    /**
     *
     */
    right: 0,       eRight:   undefined,

    /**
     *
     */
    bottom: 0,      eBottom:  undefined,

    /**
     *
     */
    top: 0,         eTop:     undefined,

    /**
     *
     */
    width: 0,       eWidth:   undefined,

    /**
     *
     */
    height: 0,      eHeight:   undefined,

    /**
     *
     */
    maxObjects: 16,

    /**
     *
     */
    f: 2,

    /**
     * @constructor
     * @param options
     */
    initialize: function(options) {
        options = options || {};
        this.canvas             = options.canvas;
        this.left               = options.left              || 0;                           this.eLeft       = undefined;
        this.right              = options.right             || 0;                           this.eRight      = undefined;
        this.top                = options.top               || 0;                           this.eTop        = undefined;
        this.bottom             = options.bottom            || 0;                           this.eBottom     = undefined;
        this.parent             = options.parent            || undefined;
        this.nodes              = options.nodes             || [];
        this.objects            = options.objects           || [];
        this.height             = options.height            || (this.bottom - this.top);    this.eWidth  = undefined;
        this.width              = options.width             || (this.right - this.left);    this.eHeight = undefined;
        this.maxObjects         = options.max               || this.maxObjects;
    },

    /**
     * split current node into new 4 sub-nodes
     */
    split: function() {
        var h2 = this.height/2;
        var w2 = this.width/2;
        var i, j;
        this.nodes.push(new Speroteck.QuadNode({
            top: this.top, left: this.left, bottom: this.top + h2, right: this.left + w2,
            parent: this,
            width: w2, height: h2,
            canvas: this.canvas,
            max: this.maxObjects*2
        }));
        this.nodes.push(new Speroteck.QuadNode({
            top: this.top, left: this.left + w2, bottom: this.top + h2, right: this.right,
            parent: this,
            width: w2, height: h2,
            canvas: this.canvas,
            max: this.maxObjects*2
        }));
        this.nodes.push(new Speroteck.QuadNode({
            top: this.top + h2, left: this.left, bottom: this.bottom, right: this.left + w2,
            parent: this,
            width: w2, height: h2,
            canvas: this.canvas,
            max: this.maxObjects
        }));
        this.nodes.push(new Speroteck.QuadNode({
            top: this.top + h2, left: this.left + w2, bottom: this.bottom, right: this.right,
            parent: this,
            width: w2, height: h2,
            canvas: this.canvas,
            max: this.maxObjects*2
        }));

        for (i = 0; i < this.objects.length; i += 1) {
            for (j = 0; j < this.nodes.length; j += 1) {
                if (this.nodes[j].isInsideExtended(this.objects[i][0])) {
                    this.nodes[j].objects.push([this.objects[i][0], this.objects[i][1]]);
                }
            }
            this.objects.splice(i, 1);
            i = -1;
        }

        return this;
    },

    /**
     *
     * @param rec {object}
     * @param obj {Speroteck.Object}
     *
     * @returns {*}
     */
    add: function(rec, obj) {
        var i;
        if (!this.isInsideExtended(rec)) return this;

        if (this.objects.length < this.maxObjects && !this.nodes.length) {
            this.objects.push([rec, obj]);
        } else {
            if (!this.nodes.length) {
                this.split();
            }
            for (i = 0; i < this.nodes.length; i += 1) {
                this.nodes[i].add(rec, obj);
            }
        }

        return this;
    },

    /**
     * does check if rec is inside current node
     * @param rec {object}
     *
     * @returns {boolean}
     */
    isInside: function(rec) {
        return this.left <= rec.x
            && rec.x <= this.right
            && this.top <= rec.y
            && rec.y <= this.bottom;
    },

    /**
     * returns neighbors of given rec
     * @param rec {object}
     *
     * @returns Array
     */
    getObjects: function(rec) {
        var quadrant;

        if ((quadrant = this.getQuadrantExtended(rec)) !== -1) {
            return this.nodes[quadrant].getObjects(rec);
        }

        return this.getAllObjects();
    },

    /**
     *
     * @returns {*}
     */
    getAllObjects: function() {
        var objects = this.objects,
            parent  = this.parent;
        while (typeof parent !== 'undefined') {
            objects = objects.concat(parent.objects);
            parent = parent.parent;
        }

        return objects;
    },

    /**
     * @todo need to avoid hard-code
     * @param x
     * @param y
     * @returns {*}
     */
    isEmpty: function(x, y) {
        var i;
        for (i = 0; i < this.objects.length; i += 1) {
            if (Math.abs(x - this.objects[i][0].x) < 32 && Math.abs(y - this.objects[i][0].y) < 32) {
                return false;
            }
        }
        for (i = 0; i < this.nodes.length; i += 1) {
            if (this.nodes[i].isInside({'x': x, 'y': y})) {
                return this.nodes[i].isEmpty(x, y);
            }
        }

        return true;
    },

    /**
     *
     * @param rec Object
     */
    remove: function(rec) {
        var i;
        for (i = 0; i < this.objects.length; i += 1) {
            if (rec.x === this.objects[i][0].x && rec.y === this.objects[i][0].y) {
                this.objects.splice(i, 1);
                i = 0;
            }
        }

        for (i = 0; i < this.nodes.length; i += 1) {
            this.nodes[i].remove(rec);
        }

        return this;
    },

    /**
     * does check if rec is inside current extended node
     * @param rec {object}
     *
     * @returns {boolean}
     */
    isInsideExtended: function(rec) {
        return this.getExtendedLeft() < rec.getLeft()
            && rec.getRight()         < this.getExtendedRight()
            && this.getExtendedTop()  < rec.getTop()
            && rec.getBottom()        < this.getExtendedBottom();
    },

    /**
     *
     * @param rec
     */
    getQuadrantExtended: function(rec) {
        var j;
        for (j = 0; j < this.nodes.length; j += 1) {
            if (this.nodes[j].isInsideExtended(rec) && this.nodes[j].isInside(rec)) {
                return j;
            }
        }

        return -1;
    },

    /**
     *
     * @returns {Number}
     */
    getExtendedLeft: function() {
        if (typeof this.eLeft === 'undefined') {
            this.eLeft = this.right - this.getExtendedWidth();
        }

        return this.eLeft;
    },

    /**
     *
     * @returns {Number}
     */
    getExtendedRight: function() {
        if (typeof this.eRight === 'undefined') {
            this.eRight = this.left + this.getExtendedWidth();
        }

        return this.eRight;
    },

    /**
     *
     * @returns {Number}
     */
    getExtendedTop: function() {
        if (typeof this.eTop === 'undefined') {
            this.eTop = this.bottom - this.getExtendedHeight();
        }

        return this.eTop;
    },

    /**
     *
     * @returns {Number}
     */
    getExtendedBottom: function() {
        if (typeof this.eBottom === 'undefined') {
            this.eBottom = this.top + this.getExtendedHeight();
        }

        return this.eBottom;
    },

    /**
     *
     * @returns {*}
     */
    getExtendedWidth: function() {
        if (typeof this.eWidth === 'undefined') {
            this.eWidth = this.width * this.f;
        }

        return this.eWidth;
    },

    /**
     *
     * @returns {*}
     */
    getExtendedHeight: function() {
        if (typeof this.eHeight === 'undefined') {
            this.eHeight = this.height * this.f;
        }

        return this.eHeight;
    },

    /**
     * remove all objects from the tree
     */
    reset: function() {
        var i;
        this.objects = [];
        for (i = 0; i < this.nodes.length; i += 1) {
            this.nodes[i].reset();
        }

        return this;
    }
});
