// Prototypes
// __proto__ is a reference to template prototype object

String.prototype.yell = function() {
  return `!!! ${this.toUpperCase()} !!!`
}


// OOP
//
// Factory
//
function hex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) 
}


function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`
}

// hex(255,100,25)
// rgb(255,100,25)

function makeColor(r,g,b) {
  const color = {}
  color.r = r
  color.g = g
  color.b = b
  color.rgb = function(){
    const { r, g, b } = this
    return `rgb(${r}, ${g}, ${b})`
  }
  color.hex = function(){
    const { r, g, b } = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) 
  }

  return color
}

const firstColor = makeColor(35, 255, 150)

// Constructors
//
// New operator:
// Creates a blank, plain JavaScript object.
// Adds a property to the new object (__proto__) that links to the constructor function's prototype object
//
// Note: Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor function (using new).
//
// Binds the newly created object instance as the this context (i.e. all references to this in the constructor function now refer to the object created in the first step).
// Returns this if the function doesn't return an object.

function ProtoColor(r, g, b) {
  this.r = r
  this.g = g
  this.b = b
}
ProtoColor.prototype.rgb = function(){
  const { r, g, b } = this
  return `rgb(${r}, ${g}, ${b})`
}
ProtoColor.prototype.hex = function(){
  const { r, g, b } = this
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) 
}
ProtoColor.prototype.rgba = function(a=1.0){
  const { r, g, b } = this
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const color1 = new ProtoColor (40, 50, 60)
const color2 = new ProtoColor (0, 0, 0)

// Class syntax
//

class Color {
  constructor(r, g, b, name){
    this.r = r
    this.g = g
    this.b = b
    this.name = name
    this.calcHSL()
  }
  innerRGB(){
    const { r, g, b } = this
    return `${r}, ${g}, ${b}`
  }
  rgb(){
    return `rgb(${this.innerRGB()})`
  }
  rgba(a = 1.0){
    return `rgba(${this.innerRGB()}, ${a})`
  }
  hex(){
    const { r, g, b } = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) 
  }
  hsl(){
    const { h, s, l } = this
    return `hsl(${h},${s}%,${l}%)`
  }
  fullySaturated(){
    const { h, l } = this
    return `hsl(${h},100%,${l}%)`
  }
  opposite() {
    const { h, s, l } = this
    const newHue = (h + 180) % 360
    return `hsl(${newHue},${s}%,${l}%)`
  }
  calcHSL(){
    let { r, g, b } = this
    // Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
    this.h = h
    this.s = s
    this.l = l
  }
}

const red = new Color(255, 67, 89, 'tomato')
const white = new Color(255, 255, 255, 'white')

// Inheritance (more like composition tbh)
//

class Pet {
  constructor(name, age){
    this.name = name
    this.age = age
  }
  eat(){
    return `${this.name} is eating!`
  }
}

class Cat extends Pet {
  constructor (name, age, livesLeft = 9) {
    // super call constructor of parent class
    // super is a reference to the superclass
    super(name, age)
    this.livesLeft = livesLeft 
  }
  meow(){
    return 'Meow!'
  }
}

const monty = new Cat('monty', 9)
monty.eat()

class Dog extends Pet {
  bark(){
    return 'woof! woof!'
  }
  // Overrides parent's functions
  eat(){
    return `${this.name} eat its food`
  }
}

const wyatt = new Dog('Wyatt', 13)
wyatt.eat()
