#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

// Promisifing with util.promisify
// const util = require('util')
// const lstat = util.promisify(fs.lstat)

// Usually promisified function version is included in the API
const { lstat } = fs.promises

const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    // throw new Error(err) - the right way
    console.log(err)
  }

  // File or Folder?
  // Bad way - unpredictable files and folders order
  // for (let filename of filenames) {
  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err)
  //     }

  //     console.log(filename, stats.isFile())
  //   })
  // }

  // Best option
  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename))
  })

  const allStats = await Promise.all(statPromises)

  for (let stats of allStats) {
    const index = allStats.indexOf(stats)

    if (stats.isFile()) {
      console.log(filenames[index])
    } else {
      console.log(chalk.bold(filenames[index]))
    }
  }
    
  // Good option #1 - hard to scale
  // const allStats = Array(filenames.length).fill(null)

  // for (let filename of filenames) {
  //   const index = filenames.indexOf(filename)

  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err)
  //     }

  //     allStats[index] = stats

  //     const ready = allStats.every((stats) => {
  //       return stats
  //     }) 

  //     if (ready) {
  //       allStats.forEach((stats, index) => {
  //         console.log(filenames[index], stats.isFile())
  //       })
  //     }
  //   })
  // }

  // Good option #2 - realtively bad performance - all functino calls are serial
  // for (let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename)

  //     console.log(filename, stats.isFile())
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
})

// Promisifing the function w/o utils.promisify
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err)
//       }

//       resolve(stats)
//     })
//   })
// }
