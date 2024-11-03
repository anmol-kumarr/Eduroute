const { getAllRating } = require('../controllers/RatingAndReviews.js')

const routes=require('express').Router()

routes.get('/get-all-ratings',getAllRating)

module.exports=routes