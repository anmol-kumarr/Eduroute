import { useState } from "react"
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'


Chart.register( ...registerables)



const InstructorChart = ({data}) => {

    const [currentChart, setCurrentChart] = useState('Student')
    const randomColor = (number) => {
        const colors = []
        for (let i = 0; number > i; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }
    const chartDataForStudent = {
        labels: data?.map((course) => course.courseName),
        datasets: [
            {
                data: data?.map((course) => course.totalEnrolledStudent),
                backgroundColor: randomColor(data?.length)

            }
        ]
    }
    const chartDataForIncome = {
        labels: data?.map((course) => course.courseName),
        datasets: [
            {
                data: data?.map((course) => course.totalIncome),
                backgroundColor: randomColor(data?.length)

            }
        ]
    }
    const options = {
        maintainAspectRatio: false,
    }
    return (

        <div className="flex flex-col 850px:w-3/4 sm:w-10/12 w-[95%]  mx-auto my-5 ">
            <p className="my-2">Visualized Data for instructor</p>
            <div className="flex gap-3">
                <button className="bg-yellow-200 rounded-md px-2 py-1 text-sm" onClick={()=>setCurrentChart('Student')}>Student</button>
                <button  className="bg-yellow-200 rounded-md px-2 py-1 text-sm"  onClick={()=>setCurrentChart('Income')}>Income</button>
            </div>
            <div className="my-5">
                <Pie data={currentChart === 'Student' ? chartDataForStudent : chartDataForIncome} options={options}></Pie>
            </div>
        </div>
    )
}
export default InstructorChart