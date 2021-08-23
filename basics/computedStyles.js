const allLis = document.querySelectorAll('li')
const colors = ['red','orange','yellow','green','blue','purple']

const li = document.querySelector('li')
const compStyles = getComputedStyle(li)
console.log(compStyles.color)
console.log(compStyles.fontSize)


// allLis.forEach((li, i) => {
//   const color = colors[i]
//   li.style.color = color
// })