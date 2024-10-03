import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Import your components
import Tasks from "./components/Task";
import Friends from "./components/Friend";
import Wallet from "./components/Wallet";
import Navigation from "./components/Footer"; // Import the Navigation component

const App = () => {
  return (
    <div style={{ height: "100vh", overflowX: "hidden",display:"flex" ,flexDirection:"column"}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
        <Navigation />
      </Router>
    </div>
  );
};

export default App;