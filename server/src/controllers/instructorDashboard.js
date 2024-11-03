const Course=require('../models/course.Model')
exports.getDashboardInfo=async(req,res)=>{
    try{
        const instructorCourse=await Course.find({intructor:req.user.id})
        const courseData=instructorCourse.map((course)=>{
            const totalEnrolledStudent=course.studentEnrolled.length
            const totalIncome=totalEnrolledStudent*course.price
            const courseWithStatus={
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalEnrolledStudent,
                totalIncome
            }

            return courseWithStatus
        })

        return res.status(200).json({
            success:true,
            message:'Details fetched successfuly',
            data:courseData
        })
    }catch(err){
        //console.log(err)
    }
}