/**
 * @file 画笔
 * @author musicode
 */
define(function (require, exports, module) {

    'use strict';

    var window2Canvas = require('./util/window2Canvas');
    var snapshoot = require('./util/snapshoot');
    var extend = require('./util/extend');
    var retina = require('./util/retina');
    var Shape = require('./Shape');

    function Painter(options) {
        extend(this, options);
        this.init();
    }

    Painter.prototype = {

        constructor: Painter,

        init: function () {

            var me = this;

            /**
             * 操作历史
             *
             * @type {Array}
             */
            me.history = [ ];

            retina(me.shapeCanvas);
            retina(me.effectCanvas);

        },

        addShape: function (shape) {

            var index = this.history.push(shape);
            shape.index = index - 1;

            shape.trim();

            console.log(shape.x, shape.y, shape.width, shape.height);
        },

        /**
         * 删除 Shape
         *
         * @param {Array.<Object} shapes
         */
        removeShape: function (shapes) {

            if (!Array.isArray(shapes)) {
                shapes = [ shapes ];
            }

            if (shapes.length === 0) {
                return;
            }

            // shapes 按索引倒序排列，方便删除
            shapes = shapes.sort(
                function (a, b) {
                    return b.index - a.index;
                }
            );

            var me = this;
            var history = me.history;

            shapes.forEach(
                function (shape) {
                    history.splice(shape.index, 1);
                }
            );

            var shape = shapes[ shapes.length - 1 ];

            shape.undo(
                getContext(me.shapeCanvas)
            );

            me.refresh(shape.index);

        },

        startClearing: function (type) {

            var me = this;
            var shapeCanvas = me.shapeCanvas;
            var shapeContext = getContext(shapeCanvas);

            var effectCanvas = me.effectCanvas;
            var effectContext = getContext(effectCanvas);

            var history = me.history;

            effectCanvas.onmousedown = function (e) {

                var point = window2Canvas(effectCanvas, e.clientX, e.clientY);

                var shapes = [ ];

                history.forEach(
                    function (shape) {
                        if (shape.inRect(point)) {
                            shapes.push(shape);
                        }
                    }
                );

                me.removeShape(shapes);

            };
            effectCanvas.onmousemove = function (e) {

                var point = window2Canvas(effectCanvas, e.clientX, e.clientY);

                effectContext.clearRect(0, 0, effectCanvas.width, effectCanvas.height);

                history.forEach(
                    function (shape) {
                        if (shape.inRect(point)) {
                            shape.highlight(effectContext);
                        }
                    }
                );
            };
        },

        startDrawing: function (name) {

            var me = this;

            var shapeCanvas = me.shapeCanvas;
            var shapeContext = getContext(shapeCanvas);

            var effectCanvas = me.effectCanvas;
            var effectContext = getContext(effectCanvas);

            var shape;

            var draw = function (action) {
                shape.undo(shapeContext);
                return shape.draw(shapeContext, action);
            };

            effectCanvas.onmousedown = function (e) {

                shape = new Shape({
                    name: name,
                    action: 'add',
                    snapshoot: snapshoot(shapeContext),
                    points: [
                        window2Canvas(effectCanvas, e.clientX, e.clientY)
                    ],
                    style: {
                        thickness: shapeContext.lineWidth,
                        stroke: shapeContext.strokeStyle,
                        fill: shapeContext.fillStyle
                    }
                });

                if (draw('down')) {

                    document.onmousemove = function (e) {

                        shape.addPoint(
                            window2Canvas(effectCanvas, e.clientX, e.clientY)
                        );

                        draw('move');
                    };

                    document.onmouseup = function () {

                        draw('up');

                        me.addShape(shape);

                        document.onmousemove =
                        document.onmouseup = null;

                    };

                }

            };



        },

        stopDrawing: function () {

            var me = this;

            me.shapeCanvas.onmousedown = null;

        },

        refresh: function (index) {

            index = index || 0;

            var me = this;
            var history = me.history;
            var context = getContext(me.shapeCanvas);

            for (var i = index, len = history.length, shape; i < len; i++) {

                shape = history[i];

                shape.index = i;
                shape.snapshoot = snapshoot(context);
                shape.draw(context);

            }
        }
    };

    function getContext(canvas) {
        return canvas.getContext('2d');
    }

    return Painter;

});