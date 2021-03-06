/**
 * @file 数组操作
 * @author musicode
 */
define(function (require, exports, module) {

  return {

    each(array, callback, reversed) {
      let { length } = array
      if (length) {
        if (reversed) {
          for (let i = length - 1; i >= 0; i--) {
            if (callback(array[ i ], i) === false) {
              break
            }
          }
        }
        else {
          for (let i = 0; i < length; i++) {
            if (callback(array[ i ], i) === false) {
              break
            }
          }
        }
      }
    },

    push(array, item) {
      array.push(item)
    },

    pop(array) {
      array.pop(array)
    },

    remove(array, item) {
      let index = array.indexOf(item)
      if (index >= 0) {
        array.splice(index, 1)
        return true
      }
    },

    last(array) {
      return array[ array.length - 1 ]
    },

    has(array, item) {
      return array.indexOf(item) >= 0
    }
  }

})