import React from "react";
import { Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";
import NavBar from "./components/NavBar.js";
import StudentList from "./components/StudentList.js";
import StudentForm from "./components/StudentForm.js";
import UpdateStudent from "./components/UpdateStudent.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/StudentForm" element={<StudentForm />} />
        <Route path="/UpdateStudent/:id" element={<UpdateStudent />} />
      </Routes>
    </>
  );
}

export default App;
