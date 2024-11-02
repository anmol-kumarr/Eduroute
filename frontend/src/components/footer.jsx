import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    const list = [
        {
            heading: 'Resources',
            data: [
                'Articles',
                'Blog',
                'Chart Sheet',
                'Code challenges',
                'Docs',
                'Projects',
                'Videos',
                'Workspaces'
            ]

        },
        {
            heading: 'Plans',
            data: [
                'Paid memberships',
                'For students',
                'Business solutions ',

            ]
        },
        {
            heading: 'Subjects',
            data: [
                'AI',
                'Cloud Computing',
                'Code Foundations',
                'Computer Science',
                'Cybersecurity',
                'Data Analytics',
                'Data Science',
                'Data Visualization',
                'Developer Tools',
                'DevOps',
                'Game Development',
                'IT',
                'Machine Learning',
                'Math',
                'Mobile Development',
                'Web Design',
                'Web Development',

            ]
        },
        {
            heading: 'Languages',
            data: [
                'Bash',
                "C",
                'C++',
                'C#',
                'HTML & CSS',
                'Java',
                'JavaScript',
                'Kotlin',
                'PHP',
                'Python',
                'R',
                'Ruby',
                'SQL',
                'Swift',
            ]
        },
        {
            heading: 'Career builidng',
            data: [
                'Career paths',
                'Career services',
                'Interview prep',
                'Professional certification',
                'Full Catalog',
                'Beta Content'
            ]
        }
    ]
    return (
        <footer className="w-11/12 mx-auto pb-10 ">
            <div className="flex w-full justify-evenly  pt-20 pb-5">

                <div className="w-2/5">

                    <div className="flex justify-between flex-wrap">
                        <div className="min-w-[150px]">

                            <div className="font-edu-sa text-richblack-50 font-bold text-xl mb-3">Eduroute</div>
                            <div className="text-richblack-400 font-inter flex flex-col gap-1 text-sm">

                                <p>Company</p>
                                <p>About</p>
                                <p>Careers</p>
                                <p>Affiliates</p>
                            </div>

                            <div className=" flex text-lg my-2  items-center gap-2 text-richblack-400">
                                <FaFacebook></FaFacebook>
                                <FaInstagram></FaInstagram>
                                <BsYoutube></BsYoutube>
                                <FaXTwitter></FaXTwitter>
                            </div>
                        </div>

                        <div className="min-w-[150px]">
                            <p className="text-richblack-100 font-inter mb-3  font-semibold text-lg">{list[0].heading}</p>
                            {
                                list[0].data.map((item, index) => (
                                    <p className="text-richblack-400 font-inter my-1 text-sm" key={index}>{item}</p>
                                ))
                            }

                            <p className="text-richblack-100 font-inter font-semibold text-lg mt-5">Support</p>
                            <p className="text-richblack-400 font-inter my-1 text-sm">Help center</p>
                        </div>

                        <div className="min-w-[150px]">
                            <p className="text-richblack-100 mb-3 font-inter font-semibold text-lg">{list[1].heading}</p>
                            {
                                list[1].data.map((item, index) => (
                                    <p className="text-richblack-400 font-inter my-1 text-sm" key={index}>{item}</p>
                                ))
                            }
                            <p className="text-richblack-100 font-inter font-semibold text-lg mt-5">Community</p>
                            <p className="text-richblack-400 font-inter my-1 text-sm">Forum </p>
                            <p className="text-richblack-400 font-inter my-1 text-sm">Chapters </p>
                            <p className="text-richblack-400 font-inter my-1 text-sm">Events</p>
                        </div>
                    </div>
                </div>

                <div className="w-[0.6px] bg-richblack-600"></div>


                <div className="w-2/5 flex justify-between flex-wrap">
                    <div className="min-w-[150px]">

                        <p className="text-richblack-100 font-semibold text-lg mb-3">{list[2].heading}</p>
                        {
                            list[2].data.map((item, index) => (
                                <p className="text-richblack-400 font-inter my-1 text-sm" key={index}>{item}</p>
                            ))
                        }

                    </div>
                    <div className="min-w-[150px]">
                        <p className="text-richblack-100 font-semibold text-lg mb-3">{list[3].heading}</p>
                        {
                            list[3].data.map((item, index) => (
                                <p className="text-richblack-400 font-inter my-1 text-sm" key={index}>{item}</p>
                            ))
                        }
                    </div>
                    <div className="min-w-[150px]">
                        <p className="text-richblack-100 font-semibold text-lg mb-3">{list[4].heading}</p>
                        {
                            list[4].data.map((item, index) => (
                                <p className="text-richblack-400 font-inter my-1 text-sm" key={index}>{item}</p>
                            ))
                        }

                    </div>

                </div>


            </div>
            <div className="h-[0.6px] bg-richblack-600 w-full"></div>
        </footer>
    )
}
export default Footer