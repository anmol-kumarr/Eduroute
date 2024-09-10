const express=require('express')


const routes=express.Router()

routes.get('/demo',(req,res)=>{
    res.send('demo')
})

module.exports=routes