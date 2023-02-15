import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddCampusForm from './AddCampusForm';

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
        </Routes>
    </Router>
  );
};

export default Main;
