const express = require('express')
const axios = require('axios')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('hello')
})

module.exports = routes