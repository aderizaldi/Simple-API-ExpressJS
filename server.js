const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv/config')

//middleware
app.use(express.json()) //app/json parse
app.use(express.urlencoded({ extended: true })) //urlencoded parse
app.use(cors()) //cors

//route
app.get('/', (req, res) => {
    res.json({message : 'helloworld'})
})

// listen server
app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
})