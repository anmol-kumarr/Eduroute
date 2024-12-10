import { useSelector } from "react-redux";
import line from '../../../../assets/TimeLineLogo/Line 14.svg';
import { MdDone } from "react-icons/md";
const Step = () => {
    const steps = [
        { id: 1, title: 'Course information' },
        { id: 2, title: 'Course builder' },
        { id: 3, title: 'Course publish' }
    ];
    const step = useSelector(state => state.course.step);

    return (
        <div className="flex items-center sm:text-base text-xs justify-center ml-5 my-5">
            {steps.map((item) => (
                <div key={item.id} className="text-start text-sm">
                    <div className="flex items-center ">
                        <div className={`w-7 sm:text-base text-xs h-7 flex items-center justify-center rounded-full ${item.id === step || step>item.id ? 'bg-yellow-100 border border-yellow-100 bg-opacity-50 text-yellow-100' : 'bg-richblack-600 bg-opacity-50 text-richblack-200 border border-richblack-600'}`}>
                            {
                                step>item.id? (<MdDone></MdDone>):(item.id)
                            }
                        </div>
                        {item.id < 3 && (
                            <div className={`sm:w-40 360px:w-24 w-20 border border-dashed ${step>item.id?'border-yellow-100':'border-richblack-400'} `}>
                            
                            </div>
                        )}
                    </div>
                    <div className={`my-1 sm:text-base text-xs sm:-ml-7 -ml-5 ${item.id===step ?'text-richblack-400':'text-richblack-50'}`}>
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Step;
