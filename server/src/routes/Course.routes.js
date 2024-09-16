const express = require('express')
const { route } = require('./Profile.routes')
const { isInstructor, auth, isAdmin } = require('../middleware/Auth.Mw')
const { createCourse } = require('../controllers/Course')
const { createCategories, showCategories } = require('../controllers/Categories')
const { createSection, updateSection, deleteSection } = require('../controllers/Section')
const { createSubSection } = require('../controllers/SubSection')

const routes = express.Router()

routes.post('/create/category',[auth,isAdmin],createCategories)

routes.post('/create', [auth, isInstructor],createCourse)


routes.post('/create/section',[auth,isInstructor],createSection)
routes.put('/update/section',[auth,isInstructor],updateSection)
routes.delete('/section/:sectionId',[auth,isInstructor],deleteSection)


routes.post('/create/subSection',[auth,isInstructor],createSubSection)
routes.put('/update/subSection',[auth,isInstructor])




routes.get('/get/AllCategories',[auth,isAdmin],showCategories)


module.exports = routes