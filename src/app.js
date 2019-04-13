const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')

const {geocode} = require('./utils/geocode')
const {forecast} = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup template engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicDir))

// Routes
const author = 'Rob the Robot'
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help',
        author,
        message: 'Need help? You came to the right place.'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.search
        if(!address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Rob the Robot',
        message: `I'm sorry, I can't find that help article.`
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Rob',
        message: `I'm sorry, I can't find your page.`
    })
})


// Start web server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})