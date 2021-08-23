// Computed properties
const getStats = (arr) => {
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const sum = arr.reduce((sum, r) => sum + r)
  const avg = sum / arr.length

  // return {
  //   max: max,
  //   min: min,
  //   sum: sum,
  //   avg: avg
  // }
  return {
    max,
    min,
    sum,
    avg
  }
}

const reviews = [4.5, 5.0, 3.44, 2.8, 3.5, 4.0, 3.5]
const stats = getStats(reviews)

const role = 'host'
const person = 'Jools Holland'
const role2 = 'Director'
const person2 = 'James Cameron'

// const team = {
//   role: person
// }
// const team = {}
// team[role] = person
// team[role2] = person2

const team = {
  [role]: person,
  [role2]: person2
}

// function addProp(obj,k,v) {
//   const copy = {...obj}
//   copy[k] = v
//   return copy
// }

// const addProp = (obj,k,v) => {
//   return {...obj, [k]: v}
// }
const addProp = (obj,k,v) => ({...obj, [k]: v})

const res = addProp(team, 'happy', ':)')

// Functions as methods in object

// const add = function(x,y) {
//   return x + y
// }

const math = {
  numbers: [1,2,3,4,5],
  add: function(x,y){
    return x + y
  },
  multiply: function(x,y){
    return x * y
  }
}

// Shorter functions as methods in objects notation
const auth = {
  username: 'TommyBot',
  login(){
    console.log('LOGGED YOU IN')
  },
  logout(){
    console.log('GOODBYE')
  }
}
