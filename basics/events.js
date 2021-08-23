// the thing   event type the code to run
// button       click       change of color
// input      hits return     get search results
// image        mouseover     display the img captino

const btn = document.querySelector('#clicker')
// btn.onclick = () => (console.log('single click'))
// btn.ondblclick = () => (console.log('dbl click'))

btn.addEventListener('click', () => {
  alert('clicked')
})

btn.addEventListener('click', () => {
  console.log('second')
})
btn.addEventListener('mouseover', function() {
  btn.innerText = 'Stop'
})
btn.addEventListener('mouseout', function() {
  btn.innerText = 'Click me'
})

window.addEventListener('scroll', function() {
  console.log('STOP SCROLLING')
})