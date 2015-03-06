/**
 * @file 绘制圆角矩形路径
 * @author musicode
 */
define(function (require, exports, module) {

    'use strict';

    var drawRect = require('./rect');

    /**
     * 绘制圆角矩形路径
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} x 矩形左上角横坐标
     * @param {number} y 矩形左上角纵坐标
     * @param {number} width 矩形宽度
     * @param {number} height 矩形高度
     * @param {number} radius 圆角大小
     */
    return function (context, x, y, width, height, radius) {

        if (radius > 0) {
            context.moveTo(x + radius, y);

            context.arcTo(
                x + width,
                y,
                x + width,
                y + radius,
                radius
            );

            context.arcTo(
                x + width,
                y + height,
                x + width - radius,
                y + height,
                radius
            );

            context.arcTo(
                x,
                y + height,
                x,
                y + height - radius,
                radius
            );

            context.arcTo(
                x,
                y,
                x + radius,
                y,
                radius
            );
        }
        else {
            drawRect(context, x, y, width, height);
        }
    };

});