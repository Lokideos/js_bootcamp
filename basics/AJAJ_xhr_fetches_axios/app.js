// name todd
// email -> todd@gmail.com
// age -> 89

// XML notation
{/* <name>
  <first>Todd</first>
  <last>Whill</last>
</name>
<email>todd@gmail.com</email> */}

const jsObjectExample = {
  name: {
    first: 'Todd',
    last: 'Smith'
  },
  email: 'todd@gmail.com'
}

const jsonExample = {
	"name": "Yavin IV",
	"rotation_period": "24",
	"orbital_period": "4818",
	"diameter": "10200",
	"climate": "temperate, tropical",
	"gravity": "1 standard",
	"terrain": "jungle, rainforests",
	"surface_water": "8",
	"population": "1000",
	"residents": [],
	"films": [
		"https://swapi.dev/api/films/1/"
	],
	"created": "2014-12-10T11:37:19.144000Z",
	"edited": "2014-12-20T20:58:18.421000Z",
	"url": "https://swapi.dev/api/planets/3/"
}

// ******* XMLHttpRequest (or XHR) example *******
//
const firstXHRRequest = new XMLHttpRequest()
firstXHRRequest.addEventListener('load', function() {
  console.log('First XHR request worked')
  const data = JSON.parse(this.responseText)
  const filmUrl = data.results[0].films[0]
  const filmRequest = new XMLHttpRequest()
  filmRequest.addEventListener('load', function() {
    console.log('Second XHR request worked')
    const filmData = JSON.parse(this.responseText)
    console.log(filmData)
  })
  filmRequest.addEventListener('error', function(e) {
    console.log('Error', e)
  })
  filmRequest.open('GET', filmUrl)
  filmRequest.send()
  // for (let planet of data.results) {
  //   console.log(planet.name)
  // }
})
firstXHRRequest.addEventListener('error', () => {
  console.log('encountered an error')
})
firstXHRRequest.open('GET', 'https://swapi.dev/api/planets/')
firstXHRRequest.send()
console.log('Request sent')

// ******* Fetch example *******
//
fetch('https://swapi.dev/api/planets/')
  .then((response) => {
    if (!response.ok) 
      throw new Error(`Status code error: ${response.status}`)
    
      return response.json()
  })
  .then((data) => {
    // for (let planet of data.results) {
    //   console.log(planet)
    //   console.log(planet.name)
    // }
    console.log("Fetched first 10 planets")
    const filmURL = data.results[0].films[0]
    return fetch(filmURL)
  })
  .then((response) => {
    if (!response.ok) 
      throw new Error(`Status code error: ${response.status}`)
    
      return response.json()
  })
  .then((data) => {
    console.log('Fetched first film based on the first planet')
    console.log(data.title)
  })
  .catch((err) => {
    console.log('Something went wrong')
    console.log(err)
  })


const checkStatusAndParse = (response) => {
  if (!response.ok) throw new Error(`Status code error: ${response.status}`)

  return response.json()
}

const printPlanets = (data) => {
  console.log("Loaded 10 more planets...")
  for (let planet of data.results) {
    console.log(planet.name)
  }
  // const p = new Promise((resolve, reject) => {
  //   resolve(data.next)
  // })
  // return p
  return Promise.resolve(data.next)
}

const fetchNextPlanets = (url = 'https://swapi.dev/api/planets/') => {
  return fetch(url)
}

fetchNextPlanets()
  .then(checkStatusAndParse)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(checkStatusAndParse)
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(checkStatusAndParse)
  .then(printPlanets)
  .catch((err) => {
    console.log('Something went wrong')
    console.log(err)
  })

// AXIOS
// add <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> to html
//
const axiosFetchNextPlanets = (url = 'https://swapi.dev/api/planets/') => {
  return axios.get(url)
}
const axiosPrintPlanets = ({data}) => {
  for (let planet of data.results) {
    console.log(planet.name)
  }
  return Promise.resolve(data.next)
}


axiosFetchNextPlanets()
  .then(axiosPrintPlanets)
  .then(axiosFetchNextPlanets)
  .then(axiosPrintPlanets)
  .then(axiosFetchNextPlanets)
  .then(axiosPrintPlanets)
  .catch((err) => {
    console.log(err)
  })