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

        <div>
            <p>Visualize</p>
            <div>
                <button onClick={()=>setCurrentChart('Student')}>Student</button>
                <button onClick={()=>setCurrentChart('Income')}>Income</button>
            </div>
            <div>
                <Pie data={currentChart === 'Student' ? chartDataForStudent : chartDataForIncome} options={options}></Pie>
            </div>
        </div>
    )
}
export default InstructorChart