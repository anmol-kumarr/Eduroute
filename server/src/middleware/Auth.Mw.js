require('dotenv').config()
const jwt=require('jsonwebtoken')

const User=require('../models/User.Model')

exports.auth=async (req,res,next)=>{
    try{    
        const token=req.cookies.token || req.body.token || req.header('Authorisation').replace('Bearer ','')

        if(!token){
            return res.status(401).json({
                success:false,
                message:'token is missing'
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user=decode

        }catch(err){
            res.status(401).json({
                success:false,
                message:'Invalid token'
            })
        }
        next()
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

exports.isInstructor=async(req,res)=>{
    try{
        const role=req.user.accountType
        if(role!=='Instructor'){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Instructor'
            })
        }

    }catch(err){
        console.log('error in isInstructor middleware',err)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}
exports.isAdmin=async(req,res)=>{
    try{
        const role=req.user.accountType
        if(role!=='Admin'){
            return res.status(401).json({
                success:false,
                message:'This is protected route for Admin'
            })
        }

    }catch(err){
        console.log('error in isAdmin middleware',err)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}