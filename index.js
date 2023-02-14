const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv/config')

//middleware
app.use(express.json()) //app/json parse
app.use(express.urlencoded({ extended: true })) //urlencoded parse
app.use(cors()) //cors

//test server
app.get('/', async (req, res) => {
    res.json({
        status : 'success',
        message : 'Welcome!'
    })
})

//route
const routes = require('./app/routes/flickrRoute')
app.use('/', routes)

// listen server
app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
})

module.exports = app