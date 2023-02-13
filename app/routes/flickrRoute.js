const express = require('express')
const controllers = require("../controllers/flickrController")
const router = express.Router()

router.get('/flickr', controllers.flickr)

module.exports = router;