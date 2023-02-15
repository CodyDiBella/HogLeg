import React, { useState, useEffect } from 'react';

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>All Students</h1>
      {students.map(student => (
        <div key={student.id}>
          <h1>{`${student.firstName} ${student.lastName}`}</h1>
          {/* <img src={student.imageUrl} alt={`${student.firstName} ${student.lastName}`} /> */}
        </div>
      ))}
    </div>
  );
};

export default AllStudents;
