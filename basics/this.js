// This

console.log(this)

function sayHi(){
  console.log('HI')
  console.log(this)
}

var color = 'blue'
let num = 400

const greet = function() {
  console.log(this)
}

const person = {
  first: 'Cherilyn',
  last: 'Sarkisian',
  nickName: 'Cher',
  fullName(){
    const {
      first,
      last,
      nickName
    } = this
    return `${first} ${last} AKA ${nickName}`
  },
  printBio(){
    console.log(this)
    // fullName() - will not work
    const fullName = this.fullName()
    console.log(`${fullName} is a person!`)
  },
  laugh: () => {
    console.log(this)
    console.log(`${this.nickName} says hahahah`)
  }
}

const printBio = person.printBio

const annoyer = {
  phrases: ["literally", "cray cray", "I can't even", "Totes!", "YOLO", "Cant' Stop, Won't Stop"],
  pickPhrase(){
    const { phrases } = this
    const idx = Math.floor(Math.random() * phrases.length)
    return phrases[idx]
  },
  // I
  // start(){
  //   const that = this
  //   setInterval( function(){
  //     console.log(that.pickPhrase())
  //     }, 3000
  //   )
  // }
  start(){
    this.timerId = setInterval(() => {
      console.log(this.pickPhrase())
      }, 3000
    )
  },
  stop(){
    clearInterval(this.timerId)
  }
}

// annoyer.start()
// annoyer.stop()

// setInterval(func, 3000)
