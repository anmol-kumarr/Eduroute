// import { ACCOUNT_TYPE } from "../utils/constants";

export const sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "VscAccount",
    },
    {
        id: 2,
        name: "Dashboard",
        path: "/dashboard/instructor",
        type:'Instructor',
        icon: "VscDashboard",
    },
    {
        id: 3,
        name: "My Courses",
        path: "/dashboard/my-courses",
        type: 'Instructor',
        icon: "VscVm",
    },
    {
        id: 4,
        name: "Add Course",
        path: "/dashboard/add-course",
        type: 'Instructor',
        icon: "VscAdd",
    },
    {
        id: 5,
        name: "Enrolled Courses",
        path: "/dashboard/enrolled-courses",
        type: 'Student',
        icon: "VscMortarBoard",
    },
    {
        id: 6,
        name: "Your Cart",
        path: "/dashboard/wishlist",
        type: 'Student',
        icon: "VscHistory",
    },
];