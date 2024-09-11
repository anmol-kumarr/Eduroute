const express=require('express')


const routes=express.Router()

routes.get('/demo',(req,res)=>{
    res.send('hello')
})

module.exports=routes