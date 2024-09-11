const Tag = require('../models/Tags.model')
const { find } = require('../models/User.Model')


exports.setTags = async (req, res) => {
    try {
        const { tag, description } = req.body
        if (!tag || description) {
            return res.status(401).json({
                success: false,
                message: 'Fields are empty'
            })
        }

        const tagDetails = await Tag.create({ tag, description })
        console.log(tagDetails)
        return res.status(200).json({
            success: true,
            message: 'Tags created successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.showTags=async(req,res)=>{
    try{
        const allTags=await Tag.find({},{name:true,description:true})
        conseol.log(allTags)

        return res.status(200).json({
            success:true,
            message:'All tags fetched successfully',
            data:allTags
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}