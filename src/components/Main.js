import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';

const Main = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div><h1>Home</h1></div>} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/students" element={<AllStudents />} />
        </Routes>
    </Router>
  );
};


export default Main;
