const mongoose=require('mongoose')
require('dotenv').config()
const DbConnect=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>console.log('Db connected')).catch((err)=>{
        // console.log(err)
        // console.log('Db connection failed')
        process.exit(1)
    })
}

module.exports=DbConnect