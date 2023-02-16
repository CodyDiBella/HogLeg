import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampusForm from './AddCampusForm';
import AddStudentForm from './AddStudentForm';
import UnassignedStudents from './UnassignedStudents';
import TransferStudentForm from './TransferStudentForm';

const Main = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<div><h1>Home</h1></div>} /> */}
          <Route path="/" element={<AllCampuses />} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/campuses/:id" element={<SingleCampus />} />
          <Route path="/students/:studentId" element={<SingleStudent />} />
          <Route path="/add-campus" element={<AddCampusForm />} />
          <Route path="/add-student" element={<AddStudentForm />} />
          <Route path="/unassigned" element={<UnassignedStudents />} />
          <Route path="/students/:studentId/transfer" element={<TransferStudentForm />} />
        </Routes>
    </Router>
  );
};

export default Main;
