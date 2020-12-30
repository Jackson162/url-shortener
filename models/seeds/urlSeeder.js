const db = require('../../config/mongoose')
const Url = require('../Url')
const data = require('./data.json')

db.once('open', () => {
  const promiseArray = []
  for (i = 0; i < data.urls.length; i++) {
    promiseArray.push(
      Url.create(data.urls[i])
        .then(() => console.log('data is created'))
        .catch(err => console.error(err))
    )
    console.log('loop ends')
  }
  Promise.all(promiseArray)
    .then(() => {
      console.log('All data are created')
      process.exit() // or db.close()
    })
})