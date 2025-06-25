import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import HslGateCount from "./pages/HslGateCount";
import MedGateCount from "./pages/MedGateCount";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="main-container-for-app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HslGateCount />} />
          <Route path="/medgatecount" element={<MedGateCount />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
