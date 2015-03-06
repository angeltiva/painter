/**
 * @file 通过点数组绘制箭头
 * @author musicode
 */
define(function (require, exports, module) {

    'use strict';

    var drawLine = require('../path/line');

    /**
     * 通过点数组绘制箭头
     *
     * @param {CanvasRenderingContext2D} context
     * @param {Array.<Object>} points
     */
    return function (context, points) {

        var start = points[0];
        var end = points[points.length - 1];

        drawLine(context, start.x, start.y, end.x, end.y);

    };

});