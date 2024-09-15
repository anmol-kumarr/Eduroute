const cloudinary=require('cloudinary')

const connectCloudinary=()=>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET
        })
    }
    catch(err){
        console.log(err,'in cloudinary connection')
    }
}

module.exports=connectCloudinary