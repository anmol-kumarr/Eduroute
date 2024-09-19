const express = require('express')
const { route } = require('./Profile.routes')
const { isInstructor, auth, isAdmin } = require('../middleware/Auth.Mw')
const { createCourse, getCourseDetails } = require('../controllers/Course')
const { createCategories, showCategories } = require('../controllers/Categories')
const { createSection, updateSection, deleteSection } = require('../controllers/Section')
const { createSubSection, updateSubsection, deleteSubSection } = require('../controllers/SubSection')

const routes = express.Router()
// testing done--------------------------------------------------------
routes.post('/create/category',[auth,isAdmin],createCategories)

routes.post('/create', [auth, isInstructor],createCourse)
routes.get('/details/',[auth,isInstructor],getCourseDetails)
// -----------------------------------------------------------------


// testing done-----------------------------------------------
routes.post('/create/section',[auth,isInstructor],createSection)
routes.put('/update/section',[auth,isInstructor],updateSection)
routes.delete('/delete',[auth,isInstructor],deleteSection)
// --------------------------------------------------------------------

//testing done--------------------------------------------------------------
routes.post('/create/subSection',[auth,isInstructor],createSubSection)
routes.put('/update/subSection',[auth,isInstructor],updateSubsection)
routes.delete('/delete/subSection',[auth,isInstructor],deleteSubSection)
// -----------------------------------------------------------------------



routes.get('/get/AllCategories',showCategories)


module.exports = routes