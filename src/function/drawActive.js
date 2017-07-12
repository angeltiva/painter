/**
 * @file 绘制 active 效果
 * @author musicode
 */
define(function () {

  function drawThumb(context, left, top, size) {
    const gradient = context.createLinearGradient(left, top + size, left, top)
    gradient.addColorStop(0, '#ddd')
    gradient.addColorStop(1, '#f9f9f9')
    context.beginPath()
    context.fillStyle = gradient
    context.strokeStyle = '#a2a2a2'
    context.rect(left, top, size, size)
    context.stroke()
    context.fill()
  }

  return function (context, shape) {

    const thumbSize = 12

    context.lineWidth = 1
    context.strokeStyle = '#ddd'

    const { x, y, width, height } = shape.getRect()

    // 矩形线框
    context.beginPath()
    context.rect(x, y, width, height)
    context.stroke()

    const left = x - thumbSize / 2
    const center = x + (width - thumbSize) / 2
    const right = x + width - thumbSize / 2

    const top = y - thumbSize / 2
    const middle = y + (height - thumbSize) / 2
    const bottom = y + height - thumbSize / 2

    // 周围的 8 个方块
    drawThumb(context, left, top, thumbSize)
    drawThumb(context, center, top, thumbSize)
    drawThumb(context, right, top, thumbSize)
    drawThumb(context, right, middle, thumbSize)
    drawThumb(context, right, bottom, thumbSize)
    drawThumb(context, center, bottom, thumbSize)
    drawThumb(context, left, bottom, thumbSize)
    drawThumb(context, left, middle, thumbSize)

  }

})