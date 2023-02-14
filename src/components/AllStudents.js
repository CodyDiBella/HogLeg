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
      {students.map(students => (
        <div key={students.id}>
          <h2>{students.name}</h2>
          <img src={students.imageUrl} alt={students.name} />
        </div>
      ))}
    </div>
  );
};

export default AllStudents;
