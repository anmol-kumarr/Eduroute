import { TypeAnimation } from "react-type-animation"
import HomeBtn from "./btn"
import Blur from '../../assets/Images/Ellipse 2.png'
import BlurTwo from '../../assets/Images/Ellipse 2 (1).png'
const CodeBlock = ({
    heading, subHeading, btnOne, btnTwo, position, bg
}) => {


    return (
        <div className={`flex w-full flex-wrap ${position}  min-[865px]:my-0 my-10 items-center min-[865px]justify-center  justify-between`}>
            <div className="w-2/5  max-[865px]:text-center max-[865px]:mx-1 min-[865px]:my-0 my-5  min-w-[300px] flex flex-col gap-4 mx-4">
            {/* min-[865px]: */}
                <h2 className="text-richblack-5 font-bold text-2xl">{heading}</h2>
                <p className="text-richblack-300">{subHeading}</p>
                <div className="flex gap-4 max-[865px]:justify-center">
                    <HomeBtn content={btnOne.content} active={btnOne.active} render={btnOne.render} ></HomeBtn>
                    <HomeBtn content={btnTwo.content} active={btnTwo.active} render={btnTwo.render}></HomeBtn>
                </div>
            </div>
            <div className="min-w-[390px] relative p-2 w-2/5 text-richblack-100 bg-transparent">



                <div className="z-0 absolute -top-10 left-0">
                    {
                        bg === 'yellow' ? (<img src={Blur} alt="" />):(<img src={BlurTwo} alt=""></img>)
                }

                </div>

                <div className="bg-richblack-800   rounded-md p-2 z-20 flex gap-2">
                    <div className="font-mono text-sm text-center">

                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                        <p>12</p>
                        <p>13</p>
                        <p>14</p>
                        <p>15</p>
                    </div>
                    <div className="text-sm bg-transparent ">
                        <TypeAnimation
                            sequence={[
                                `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>\n</body>\n</html>`,
                                2000, 
                                '', 
                                1000, 
                            ]}
                            speed={50}
                            wrapper="pre" 
                            repeat={Infinity}
                            style={{ whiteSpace: 'pre-wrap' }}
                            omitDeletionAnimation={true}
                        />
                    </div>


                </div>
            </div>
        </div>
    )
}
export default CodeBlock

// </nav>