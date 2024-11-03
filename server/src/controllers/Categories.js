const Categories = require('../models/Categories.model.js')
// const { find } = require('../models/User.Model.js')


exports.createCategories = async (req, res) => {
    try {
        const { categories, description } = req.body
        //console.log("create categoires",categories,description)
        if (!categories || !description) {
            return res.status(401).json({
                success: false,
                message: 'Fields are empty'
            })
        }

        const categoriesDetails = await Categories.create({name:categories, description })
        // //console.log("categories details",categoriesDetails)
        return res.status(200).json({
            success: true,
            message: 'Categories created successfully'
        })
    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.showCategories = async (req, res) => {
    try {
        const allCategories = await Categories.find({}, { name: true, description: true })
        // //console.log(allCategories)

        return res.status(200).json({
            success: true,
            message: 'All categories fetched successfully',
            data: allCategories
        })


    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.categoriesPageDetails = async (req, res) => {
    try {
        const{categoriesId}=req.body

        // get course for specific id
        const selectCategories=await Categories.findById(categoriesId).populate('Course').exec()

        if(!selectCategories){
            return res.status(404).json({
                success:false,
                message:'Cannot find course'
            })
        }
        // get course for different categories

        const differentCategories=await Categories.findById({_id:{$ne:categoriesId}}).populate('Course').exec()

        const topSelling=await Categories.aggregate([
            {
                $addfields:{
                    totalEnrolled:{$size:studentEnrolled}
                }
            },{
                $sort:{
                    totalEnrolled:-1
                }
            },{
                $limit:10
            }
        ])
        return res.status(200).json({
            success:true,
            message:'Data fecthed successfully',
            data:{
                selectCategories:selectCategories,
                differentCategories:differentCategories,
                topSelling:topSelling
            }
        })

    } catch (err) {
        //console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}