import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UnassignedStudents = () => {
  const [unassignedStudents, setUnassignedStudents] = useState([]);

  useEffect(() => {
    async function fetchUnassignedStudents() {
      const response = await fetch('/api/students');
      const data = await response.json();
      const filteredData = data.filter((student) => student.campusId === null);
      setUnassignedStudents(filteredData);
    }
    fetchUnassignedStudents();
  }, []);

  return (
    <div className="singleViews">
      <h1>Students to be sorted</h1>
      {unassignedStudents.length > 0 ? (
        <div>
          <ul>
            {unassignedStudents.map((student) => (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>All students have been sorted</p>
      )}
    </div>
  );
};

export default UnassignedStudents;
