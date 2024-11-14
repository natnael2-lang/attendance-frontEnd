import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Attendance from "./components/Attendance"
import Modify from "./components/Modify"
import Register from "./components/Register"
import "./App.css"
import ModifyInfo from "./components/ModifyInfo";
import { ModifyProvider } from "./components/ModifyContex";

const App = () => {
  return (
    <div className="appContainer">
      <ModifyProvider>
      <Router>
         <Navbar />
        <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/Attendance" element={<Attendance />} />

        <Route path="/Modify" element={<Modify />} />
        <Route path="/ModifyInfo" element={<ModifyInfo/>} />
        <Route path="/Register" element={<Register />} />
          
        </Routes>
      </Router>
      </ModifyProvider>
      
    </div>
  );
};

export default App;