const express=require('express')
const routes = require('./src/routes/routes')
require('dotenv').config()

const app=express()

app.listen(process.env.PORT,()=>{
    console.log('app is running on port',process.env.PORT)
})
app.use('/api/v1',routes)
// app.get('/',(req,res)=>{
//     res.send('hello')
// })