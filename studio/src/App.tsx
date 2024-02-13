import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default App;
