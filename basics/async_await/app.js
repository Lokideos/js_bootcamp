// ******************** Async ********************
//
// function getData() {
//   const data = axios.get('https://swapi.dev/api/planets/').then((data)=>{
//     console.log(data)
//   })
//   console.log(data)
// }

// function greet(){
//   return 'hello'
// }

// async function greet(){
//   return 'hello'
// }

// greet().then((val) => {
//   console.log('promised resolved with: ', val)
// })

// // async function add(x,y){
// //   if (typeof x !== 'number' || typeof y !== 'number') {
// //     throw 'x and y must be numbers'
// //   }
// //   return x + y
// // }

// function add(x,y) {
//   return new Promise((resolve, reject) => {
//     if (typeof x !== 'number' || typeof y !== 'number') {
//       reject('x and y must be numbers')
//     } 
//     else{
//       resolve(x + y)
//     }
//   })
// }

// add(6, 7)
// .then(val => {
//   console.log('promised resolved with: ', val)
// })
// .catch((err) => {
//   console.log('promised rejected with: ', err)
// })

// function getPlanets() {
//   return axios.get('https://swapi.dev/api/planets/')
// }

// getPlanets().then((res) => {
//   console.log(res.data)
// })

// ******************** Async error handling ********************
//
async function getPlanets() {
  const res = await axios.get('https://swapi.dev/api/planetsssss/')
  console.log(res.data)
}

getPlanets().catch((err) => {
  console.log('error catcher')
  console.log(err)
})

async function getPlanets() {
  try {
    const res = await axios.get('https://swapi.dev/api/planetsssss/')
    console.log(res.data)
  } catch(err) {
    console.log('Error catched in async', err)
  }
}

getPlanets()

// ******************** Multiple Awaits ********************
//

const moveX = (element, amount, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bodyBoundary = document.body.clientWidth
      const elRight = element.getBoundingClientRect().right
      const currLeft = element.getBoundingClientRect().left
    
      if (elRight + amount > bodyBoundary) {
        reject({bodyBoundary, elRight, amount})
      }
      else {
        element.style.transform = `translateX(${currLeft + amount}px)`
        resolve()
      }
    }, delay)
  })
}
const btn = document.querySelector('button')
async function animateRight(el, amount) {
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
  await moveX(el, amount, 1000)
}
animateRight(btn, 100).catch((err) => {
  console.log('Screen boundary reached')
  animateRight(btn, -100)
})

// ******************** Parallel vs Sequential request ********************

// Sequential requests
async function get3PokemonSequential(){
  const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/1')
  const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/2')
  const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/3')
  console.log(poke1.data)
  console.log(poke2.data)
  console.log(poke3.data)
}

get3PokemonSequential()

// Parallel requests
async function get3PokemonParalell(){
  const promise1 = axios.get('https://pokeapi.co/api/v2/pokemon/1')
  const promise2 = axios.get('https://pokeapi.co/api/v2/pokemon/2')
  const promise3 = axios.get('https://pokeapi.co/api/v2/pokemon/3')
  console.log(promise1)
  const poke1 = await promise1
  const poke2 = await promise2
  const poke3 = await promise3
  console.log(promise1)
  console.log(poke1.data)
  console.log(poke2.data)
  console.log(poke3.data)
}

get3PokemonParalell()

// Promise.all
async function get3PokemonPromiseAll(){
  const promise1 = axios.get('https://pokeapi.co/api/v2/pokemon/1')
  const promise2 = axios.get('https://pokeapi.co/api/v2/pokemon/2')
  const promise3 = axios.get('https://pokeapi.co/api/v2/pokemon/3')
  const results = await Promise.all([promise1, promise2, promise3])
  console.log(results)
  printPokemon(results)
}

const printPokemon = (results) => {
  for (let pokemon of results) {
    console.log([pokemon.data.name])
  }
}

get3PokemonPromiseAll()
