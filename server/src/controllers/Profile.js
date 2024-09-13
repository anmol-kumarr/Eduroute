const Profile=require('../models/Profile.Model')
const User=require('../models/User.Model')


exports.User=async(req,res)=>{
    try{
        const {dateOfBirth='',gender='',about='',contactNumber='',}=req.body
        const id=req.user.id
        const userDetails=await User.findById(id)
        const profileId=userDetails.addtionalDetails

        const profileDetils=await Profile.findById(profileId)

        profileDetils.dateOfBirth=dateOfBirth
        profileDetils.gender=gender
        profileDetils.about=about
        profileDetils.contactNumber=contactNumber
        await profileDetils.save()
        return res.status(200).json({
            success:true,
            messsage:'Profile updated successfully',
            profileDetails:profileDetils
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while Updating Updating user details'
        })
    }
}


exports.getAllUserDetails=async(req,res)=>{
    try{
        const id=req.user.id
        const userDetails=await User.findById(id).populate('Profile')

        if(!userDetails){
            return res.status(404).json({
                succes:false,
                message:'Cannot find user'
            })
        }

        return res.status(200).json({
            success:false,
            message:'User details fetched successfully',
            data:userDetails
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching User'
        })
    }
}