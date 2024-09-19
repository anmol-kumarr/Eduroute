import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} />
      </Routes>
      <div className="bg-richblack-700 w-full">

        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
