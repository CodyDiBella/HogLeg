import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudents() {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    }
    fetchStudents();
  }, []);

  const handleAddStudentClick = () => {
    navigate('/add-student');
  };

  const handleDeleteStudentClick = async (id) => {
    try {
      await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      setStudents((students) => students.filter((student) => student.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>All Students</h1>
      <button onClick={handleAddStudentClick}>Add Student</button>
      {students.map((student) => (
        <div key={student.id}>
          <button onClick={() => handleDeleteStudentClick(student.id)}>X</button>
          <Link to={`/students/${student.id}`}>
            <h1>{`${student.firstName} ${student.lastName}`}</h1>
            <img src={student.imageUrl} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllStudents;
