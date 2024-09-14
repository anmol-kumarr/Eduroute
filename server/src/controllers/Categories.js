const Categories = require('../models/Categories.model')
const { find } = require('../models/User.Model')


exports.createCategories = async (req, res) => {
    try {
        const { categories, description } = req.body
        if (!categories || description) {
            return res.status(401).json({
                success: false,
                message: 'Fields are empty'
            })
        }

        const categoriesDetails = await Categories.create({ tag, description })
        console.log(categoriesDetails)
        return res.status(200).json({
            success: true,
            message: 'Categories created successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.showCategories = async (req, res) => {
    try {
        const allCategories = await Categories.find({}, { name: true, description: true })
        conseol.log(allCategories)

        return res.status(200).json({
            success: true,
            message: 'All categories fetched successfully',
            data: allCategories
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.categoriesPageDetails = async (req, res) => {
    try {

        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}