class Timer {
  // Works even in older JS versions
  // constructor(durationInput, startButton, pauseButton) {
  //   this.durationInput = durationInput
  //   this.startButton = startButton
  //   this.pauseButton = pauseButton

  //   this.startButton.addEventListener('click', this.start.bind(this))
  // }

  // start() {
  //   this.someMethodCall()
  // }

  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput
    this.startButton = startButton
    this.pauseButton = pauseButton
    if (callbacks) {
      this.onStart = callbacks.onStart
      this.onTick = callbacks.onTick
      this.onComplete = callbacks.onComplete
    }
    this.startButton.addEventListener('click', this.start)
    this.pauseButton.addEventListener('click', this.pause)
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining)
    }
    this.tick()
    this.interval = setInterval(this.tick, 20)
  }

  pause = () => {
    clearInterval(this.interval)
  }

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause()
      if (this.onComplete) {
        this.onComplete()
      }
    } else {
      this.timeRemaining = this.timeRemaining - .02
      if (this.onTick) {
        this.onTick(this.timeRemaining)
      }
    }
  }

  // Sets up getter method
  get timeRemaining(){
    return parseFloat(this.durationInput.value)
  }

  // Sets up setter method
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2)
  }
  
  // There is syntax sugar for getters and setter im JS
  // getTime() {
  //   return parseFloat(this.durationInput.value)
  // }

  // setTime(time) {
  //   this.durationInput.value = time
  // }
  
  // Works because of JS magick - preferable
  // start = () => {
  //   this.someMethodCall()
  // }

  // someMethodCall(){
  //   console.log('Some Method Called')
  // }
}

// This value in functinos with bind/call
// const printThis = function() {
//   console.log(this)
// }
// printThis.call() // => Window
// printThis.call({ color: 'red' })  // => { color: 'red' }

// This value in arrow functions
// const colors = {
//   printColor() {
//     console.log(this)
//     const printThis = () => {
//       console.log(this)
//     }
//     printThis()
//   }
// }
// colors.printColor()

// This value in other cases
// const colors = {
//   printColor() {
//     console.log(this)
//   }
// }
// colors.printColor() // => {printColor: f}
// const randomObject = {
//   a: 1
// }
// randomObject.printColor = colors.printColor
// randomObject.printColor() // => { a: 1, printColor: f}