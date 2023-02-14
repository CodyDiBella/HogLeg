import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>All Students</h1>
      <ul>
        {students.map(student => <li key={student.id}>{student.firstName} {student.lastName}</li>)}
      </ul>
    </div>
  );
};

export default AllStudents;
