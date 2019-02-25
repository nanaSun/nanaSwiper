class Touch {
  emulateTouchEvent(type,point) {
    return new window.TouchEvent(type, {
      bubbles: true,
      cancelable: true,
      touches:[{
        clientX:point[0],
        clientY:point[1]
      }]
    })
  }
  emulateMouseEvent(type,point) {
    return new window.TouchEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX:point[0],
      clientY:point[1]
    })
  }
}

module.exports = new Touch()
