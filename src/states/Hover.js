/**
 * @file Hover 状态
 * @author musicode
 */
define(function (require) {

  const State = require('./State')
  const Emitter = require('../Emitter')

  const array = require('../util/array')

  class Hover extends State {

    constructor(props, emitter) {

      super(props)

      let me = this, activeShapes, drawing

      me.emitter = emitter

      me.shapeEnterHandler = function (event) {
        let { shape } = event
        if (!drawing && !shape.state && (!activeShapes || !array.has(activeShapes, shape))) {
          me.shape = shape
          emitter.fire(
            Emitter.HOVER_SHAPE_CHANGE,
            {
              shape,
            }
          )
        }
      }

      me.shapeLeaveHandler = function () {
        if (me.shape) {
          me.shape = null
          emitter.fire(
            Emitter.HOVER_SHAPE_CHANGE,
            {
              shape: null
            }
          )
        }
      }

      me.drawingStartHandler = function () {
        drawing = true
      }

      me.drawingEndHandler = function () {
        drawing = false
      }

      me.activeShapeChangeHandler = function (events) {
        activeShapes = events.shapes
        if (array.has(activeShapes, me.shape)) {
          me.shape = null
        }
      }

      emitter
      .on(Emitter.SHAPE_ENTER, me.shapeEnterHandler)
      .on(Emitter.SHAPE_LEAVE, me.shapeLeaveHandler)
      .on(Emitter.DRAWING_START, me.drawingStartHandler)
      .on(Emitter.DRAWING_END, me.drawingEndHandler)
      .on(Emitter.ACTIVE_SHAPE_CHANGE, me.activeShapeChangeHandler)
    }

    destroy() {
      this.emitter
      .off(Emitter.SHAPE_ENTER, this.shapeEnterHandler)
      .off(Emitter.SHAPE_LEAVE, this.shapeLeaveHandler)
      .on(Emitter.DRAWING_START, this.drawingStartHandler)
      .on(Emitter.DRAWING_END, this.drawingEndHandler)
      .off(Emitter.ACTIVE_SHAPE_CHANGE, this.activeShapeChangeHandler)
    }

    isPointInPath(painter, x, y) {
      return false
    }

    draw(painter) {

      let { shape } = this
      if (!shape) {
        return
      }

      painter.disableShadow()

      painter.setLineWidth(4)
      painter.setStrokeStyle('#45C0FF')

      painter.begin()
      shape.drawPath(painter)
      painter.stroke()

    }

  }

  return Hover

})