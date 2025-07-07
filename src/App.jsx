import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import HslGateCount from "./pages/HslGateCount";
import MedGateCount from "./pages/MedGateCount";
import NavBar from "./components/NavBar";
import HslQuestionSheetPage from "./pages/HslQuestionSheet";
import MedQuestionSheet from "./pages/MedQuestionSheet";

function App() {
  return (
    <div className="main-container-for-app">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HslGateCount />} />
          <Route path="/hslquestionsheet" element={<HslQuestionSheetPage />} />
          <Route path="/medgatecount" element={<MedGateCount />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/medquestionsheet" element={<MedQuestionSheet />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
