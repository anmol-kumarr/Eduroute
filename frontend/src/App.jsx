import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/home";
import Footer from "./components/footer";
import Header from "./components/header";
import Auth from "./page/auth";
import ResetPassword from "./page/resetPassword";
import VerifyEmail from "./page/verifyEmail";
import OpenRoute from "./utils/openroute";
// import Login from "./components/login";
// import SignUp from "./components/signup";
import ContactPage from "./page/contact";
import PasswordResetForm from "./page/setpassword";
import Dashboard from "./page/dashboard"
// import User from "./page/user";
import About from "./page/about";
import MyProfile from "./components/dashboard/myprofile";
import EnrolledCourses from "./components/dashboard/enrolledcourses";
import DashBoardRoute from "./utils/dashboardRoute";
import PageNotFound from "./page/pageNotfound";
import CloseRoute from "./utils/closeruote";
import Cart from "./components/dashboard/cart";
import Setting from "./components/dashboard/setting";
import { useSelector } from "react-redux";
import AddCourse from "./components/dashboard/instructor/course/addCourse";



function App() {
  const location = useLocation().pathname
  // const userType = useSelector(state => state.user.user.accountType)
  return (
    <div className="overflow-x-hidden max-h-full bg-richblack-900">
      <DashBoardRoute>

        <Header></Header>
      </DashBoardRoute>

      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path='/aboutUs' element={<About></About>} />
        <Route path='/contact' element={<ContactPage></ContactPage>} />

        <Route path='/auth/:authValue' element={<OpenRoute>
          <Auth></Auth>
        </OpenRoute>} />



        <Route element={<CloseRoute>
          <Dashboard></Dashboard>
        </CloseRoute>}>

          <Route path='/dashboard/my-profile' element={<MyProfile></MyProfile>}></Route>
          <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses></EnrolledCourses>}></Route>
          <Route path='/dashboard/setting' element={<Setting></Setting>}></Route>
          <Route path='/dashboard/cart' element={<Cart></Cart>}></Route>

          if(userType==='Instructor'){
            <Route path="/dashboard/add-course" element={<AddCourse></AddCourse>} />
          }

        </Route>



        <Route
          path="/auth/forget-password"
          element={
            <OpenRoute>
              <ResetPassword></ResetPassword>
            </OpenRoute>
          } />



        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <PasswordResetForm></PasswordResetForm>
            </OpenRoute>
          } />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail></VerifyEmail>
            </OpenRoute>
          } />





        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <DashBoardRoute>

        <div className="bg-richblack-700 w-full">
          {

            location.includes('/auth') ? "" : < Footer ></Footer>
          }
        </div>
      </DashBoardRoute>
    </div >
  );
}

export default App;
