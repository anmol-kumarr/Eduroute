import { Route, Routes } from "react-router-dom";
import Home from "./page/home";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home></Home>}/>
      </Routes>
    </div>
  );
}

export default App;
