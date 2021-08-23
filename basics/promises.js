// const willGetYouADog = new Promise((resolve, reject) => {
//   const rand = Math.random()
//   if (rand < 0.5){
//     resolve()
//   }
//   else {
//     reject()
//   }
// })

// willGetYouADog.then(() => {
//   console.log('Got a dog')
// })
// willGetYouADog.catch(() => {
//   console.log('No luck')
// })

// const makeDogPromise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const rand = Math.random()
//       if (rand < 0.5){
//         resolve()
//       }
//       else {
//         reject()
//       }
//     }, 5000)
//   })
// }

// makeDogPromise()
//   .then(() => {
//     console.log('Got a dog')
//   })
//   .catch(() => {
//     console.log('No luck')
//   })

// const fakeRequest = (url) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const pages = {
//         '/users':[
//           {id: 1, username: 'Bilbo'},
//           {id: 5, username: 'Aragorn'}
//         ],
//         '/about': 'About page content'
//       }
//       const data = pages[url]
//       if (data) {
//         resolve({status: 200, data})
//       }
//       else {
//         reject({status: 404})
//       }
//     }, 1000)
//   })
// }

// fakeRequest('/users')
//   .then((res) => {
//     console.log('Status Code', res.status)
//     console.log('Data', res.data)
//     console.log('Request worked')
//   })
//   .catch((res) => {
//     console.log(res.status)
//     console.log('Request failed')
//   })

// fakeRequest('/about')
//   .then((res) => {
//     console.log('Status Code', res.status)
//     console.log('Data', res.data)
//     console.log('Request worked')
//   })
//   .catch((res) => {
//     console.log(res.status)
//     console.log('Request failed')
//   })

// fakeRequest('/not_exist')
//   .then((res) => {
//     console.log('Status Code', res.status)
//     console.log('Data', res.data)
//     console.log('Request worked')
//   })
//   .catch((res) => {
//     console.log(res.status)
//     console.log('Request failed')
//   })

  const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pages = {
          '/users':[
            {id: 1, username: 'Bilbo'},
            {id: 5, username: 'Aragorn'}
          ],
          '/users/1':{
            id: 1,
            username: 'Bilbo',
            upvotes: 360,
            city: 'Shir',
            topPostId: 454321
          },
          '/users/5':{
            id: 5,
            username: 'Aragorn',
            upvotes: 3606,
            city: 'Minas Tirith',
            topPostId: 454300
          },
          '/posts/454321':{
            id: 454321,
            title: 'Post title'
          },
          '/about': 'About page content'
        }
        const data = pages[url]
        if (data) {
          resolve({status: 200, data})
        }
        else {
          reject({status: 404})
        }
      }, 1000)
    })
  }

// fakeRequest('/users').then((res) => {
//   const id = res.data[0].id
//   fakeRequest(`/users/${id}`).then((res) => {
//     const postId = res.data.topPostId
//     fakeRequest(`/posts/${postId}`).then((res) => {
//       console.log(res)
//     })
//   })
// })

const resp = fakeRequest('/users')
  .then((res) => {
    const id = res.data[0].id
    return fakeRequest(`/users/${id}`)
  })
  .then((res) => {
    const postId = res.data.topPostId
    return fakeRequest(`/posts/${postId}`)
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log('Error encountered', err)
  })

// moveX refactoring with promises
// original function
// const btn = document.querySelector('button')
// const moveX = (element, amount, delay, onSuccess, onFailure) => {
//   setTimeout(() => {
//     const bodyBoundary = document.body.clientWidth
//     const elRight = element.getBoundingClientRect().right
//     const currLeft = element.getBoundingClientRect().left
  
//     if (elRight + amount > bodyBoundary) {
//       onFailure()
//     }
//     else {
//       element.style.transform = `translateX(${currLeft + amount}px)`
//       onSuccess()
//     }
//   }, delay)
// }

// moveX(btn, 100, 1000, () => {
//   // success
//   moveX(btn, 400, 1000, () => {
//     // success
//     moveX(btn, 200, 1000, () => {
//       console.log('great')
//     }, () => {
//       // failure
//       alert('cannot move further')  
//     })
//   }, () => {
//     // failure
//     alert('cannot move further')
//   })
// }, () => {
//   // failure
//   alert('cannot move further')
// })

// refactored version
const btn = document.querySelector('button')
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

// moveX(btn, 300, 1000)
//   .then(() => {
//     return moveX(btn, 300, 1000)
//   })
//   .then(() => {
//     return moveX(btn, 300, 1000)
//   })
//   .then(() => {
//     return moveX(btn, 300, 1000)
//   })
//   .then(() => {
//     return moveX(btn, 300, 1000)
//   })
//   .then(() => {
//     console.log('done moving')
//   })
//   .catch(() => {
//     console.log('Can not move anymore')
//   })

moveX(btn, 300, 1000)
  .then(() => moveX(btn, 300, 1000))
  .then(() => moveX(btn, 300, 1000))
  .then(() => moveX(btn, 300, 1000))
  .then(() => moveX(btn, 300, 1000))
  .then(() => moveX(btn, 300, 1000))
  .then(() => {
    console.log('done moving')
  })
  .catch(({bodyBoundary, elRight, amount}) => {
    console.log(`Body is ${bodyBoundary}px wide`)
    console.log(`Element is at ${elRight}px, ${amount}px is too large!`)
  })
