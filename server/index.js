require('dotenv').config()
const express=require('express')
const routes = require('./src/routes/Routes')
const DbConnect=require('./src/config/DBConnect')

const app=express()

app.listen(process.env.PORT,()=>{
    console.log('app is running on port',process.env.PORT)
})
DbConnect()
app.use('/api/v1',routes)
