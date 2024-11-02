require('dotenv').config()
const express=require('express')
const routes = require('./src/routes/User.routes')
const DbConnect=require('./src/config/DBConnect')
const cloudinaryconnect=require('./src/config/CloudinaryConnect')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const fileupload=require('express-fileupload')

const userRoutes=require('./src/routes/User.routes')
const paymentRoutes=require('./src/routes/Payement.routes')
const courseRoutes=require('./src/routes/Course.routes')
const profileRoutes=require('./src/routes/Profile.routes')
const cartRoutes=require('./src/routes/cart.routes')

const ratingRoutes=require('./src/routes/rating.routes')



const app=express()
const port=process.env.PORT || 3000



app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}))


app.use('/api/v1/auth',userRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/payment',paymentRoutes)
app.use('/api/v1/cart',cartRoutes)
app.use('/api/v1',ratingRoutes)


app.listen(port,()=>{
    console.log('app is running on port',process.env.PORT)
})


app.get('/api/v1/hello',(req,res)=>{
    res.send(`App is running successfully on port ${port}`)
    res.status(200).json({
        success:true,
        message:'hello'
    })
})
DbConnect()
cloudinaryconnect()