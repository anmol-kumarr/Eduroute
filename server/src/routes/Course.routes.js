const express = require('express')
const { route } = require('./Profile.routes')
const { isInstructor, auth, isAdmin, isStudent } = require('../middleware/Auth.Mw.js')
const { createCourse, getCourseDetails, updateCourse, getInstructorCourse, deleteCourse, getCategoryCourse, getEnrolledCourse, completedLecture, getCourseProgress } = require('../controllers/Course.js')
const { createCategories, showCategories } = require('../controllers/Categories.js')
const { createSection, updateSection, deleteSection } = require('../controllers/Section.js')
const { createSubSection, updateSubsection, deleteSubSection } = require('../controllers/SubSection.js')
const { isEnrolled } = require('../middleware/Enrolled..Mw.js')
const { createRating } = require('../controllers/RatingAndReviews.js')
const { getDashboardInfo } = require('../controllers/instructorDashboard.js')

const routes = express.Router()
// testing done--------------------------------------------------------
routes.post('/create/category',[auth,isAdmin],createCategories)

routes.post('/create', [auth, isInstructor],createCourse)
routes.get('/details/:courseId',getCourseDetails)
routes.put('/update',[auth,isInstructor],updateCourse)
routes.get('/instructor/my-course',[auth,isInstructor],getInstructorCourse)
routes.delete('/delete/course',[auth,isInstructor],deleteCourse)
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
routes.get('/category/:id',getCategoryCourse)


routes.get('/getEnrolledCourse',[auth,isStudent],getEnrolledCourse)

routes.get('/:courseId',[auth,isStudent,isEnrolled],getCourseDetails)



// ---------------------------------------------------------------------------
routes.put('/completed-lecture',[auth,isStudent],completedLecture)
routes.get('/get-course-progress/:courseId',[auth,isStudent,isEnrolled],getCourseProgress)
routes.post('/rating-course',[auth,isStudent],createRating)





module.exports = routes