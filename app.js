const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const funcs = require('./functions')
const { numbers, lowerCases, upperCases } = require('./dataBox.json')
const Url = require('./models/Url')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const PROTOCAL = process.env.PROTOCAL || 'http'

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  try {
    res.render('index')
  } catch(err) {
    console.error(err)
    res.render('error')
  }
})

app.post('/', async (req, res) => {
  try {
    const inputUrl = req.body.url //some query strings contain capital letters
    const urls = await funcs.fetchAllData(Url)
    const urlOfInterest = urls.find(url => url.originalUrl.includes(inputUrl))
    //whether found in db
    if (!urlOfInterest) {
      let shortUrl = ''
      let repeatedShortUrl = ''
      //whether shortUrl repeat
      do {
        shortUrl = funcs.generateRandomUrl(numbers, lowerCases, upperCases)
        repeatedShortUrl = urls.find(url => url.shortUrl === shortUrl)
        console.log('repeatedShortUrl: ', repeatedShortUrl)
      } while (repeatedShortUrl)
      Url.create({ originalUrl: inputUrl, shortUrl })
      const url = HOST === 'localhost'? `${PROTOCAL}://${HOST}:${PORT}/${shortUrl}` : `${PROTOCAL}://${HOST}/${shortUrl}`
      res.render('show', { url })
    } else if (urlOfInterest) {
      const url = HOST === 'localhost'? `${PROTOCAL}://${HOST}:${PORT}/${urlOfInterest.shortUrl}` : `${PROTOCAL}://${HOST}/${urlOfInterest.shortUrl}`
      res.render('show', { url })
    }
  } catch(err) {
    console.error(err)
    res.render('error')
  }
})

app.get('/:shortUrl', async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl
    const urls = await funcs.fetchAllData(Url)
    const urlOfInterest = urls.find(url => url.shortUrl.includes(shortUrl))
    if (urlOfInterest) {
      res.redirect(urlOfInterest.originalUrl)
    } else if (!urlOfInterest) {
      res.render('noshow')
    }
  } catch(err) {
    console.error(err)
    res.render('error')
  }
})

app.listen(PORT, () => {
  console.log(`This server is listening to http://localhost:${PORT}`)
})