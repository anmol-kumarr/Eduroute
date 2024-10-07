require('dotenv').config()
const jwt=require('jsonwebtoken')

const User=require('../models/User.Model')

exports.auth=async (req,res,next)=>{
    try{    
        const token=req.cookies.token || req.body.token || req.header('Authorization')?.replace('Bearer ','')
        console.log('cookie:',req.cookies.token)
        console.log('body:',req.body.token)
        console.log('header:',req.header('Authorization')?.replace('Bearer ',''))

        if(!token){
            return res.status(401).json({
                success:false,
                message:'access denied token is missing'
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user=decode
            next()

        }catch(err){
            console.log(err)
            res.status(401).json({
                
                success:false,
                message:'Invalid token'
            })
        }
    }
    catch(err){
        console.log('error in auth middleware',err)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

exports.isStudent=async(req,res,next)=>{
    try{
        const role=req.user.accountType
        if(role!=='Student'){
            return res.status(401).json({
                success:false,
                messsage:'This is protected route for Students'
            })
        }
        next()
    }catch(err){
        console.log('error in isStudent middleware',err)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

exports.isInstructor=async(req,res,next)=>{
    try{
        const role=req.user.accountType
        if(role!=='Instructor'){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Instructor'
            })
        }
        next()

    }catch(err){
        console.log('error in isInstructor middleware',err)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try{
        const role=req.user.accountType
        if(role!=='Admin'){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Admin'
            })
        }
        next()

    }catch(err){
        console.log('error in isAdmin middleware',err)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}