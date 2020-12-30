const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const funcs = require('./functions')
const { numbers, lowerCases, upperCases } = require('./dataBox.json')
const Url = require('./models/Url')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  try {
    res.render('index')
  } catch(err) {
    console.error(err)
  }
})

app.post('/', async (req, res) => {
  try {
    const inputUrl = req.body.url.toLowerCase()
    const urls = await funcs.fetchAllData(Url)
    const dataOfInterest = urls.find(url => url.originalUrl.toLowerCase().includes(inputUrl))
    //not found in db
    if (!dataOfInterest) {
      const shortUrl = funcs.generateRandomUrl(numbers, lowerCases, upperCases)
      console.log(numbers)
      Url.create({
        originalUrl: inputUrl,
        shortUrl
      }).then(() => res.render('show', { shortUrl }))
    } else if (dataOfInterest) {
      res.render('show', { shortUrl: dataOfInterest.shortUrl })
    }
  } catch {
    console.error(err)
  }
})

app.listen(PORT, () => {
  console.log(`This server is listening to http://localhost:${PORT}`)
})