/**
 * @file 箭头
 * @author musicode
 */
define(function (require, exports, module) {

    'use strict';

    var inherits = require('../util/inherits');

    return inherits(
        require('./Action'),
        {
            name: 'arrow',

            do: function (context) {

                var shape = this.shape;

                shape.createPath(context);
                shape.fill(context);
            }
        }
    );

});