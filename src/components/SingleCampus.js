import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleCampus = () => {
  const { id } = useParams();
  const [campus, setCampus] = useState(null);

  useEffect(() => {
    async function fetchCampus() {
      const response = await fetch(`/api/campuses/${id}`);
      const data = await response.json();
      setCampus(data);
    }
    fetchCampus();
  }, [id]);

  return (
    <div>
      {campus && (
        <div>
          <h1>{campus.name}</h1>
          <img src={campus.imageUrl} alt={campus.name} />
          <p>Address: {campus.address}</p>
          <p>{campus.description}</p>
          {campus.students.length > 0 ? (
            <div>
              <h2>Students:</h2>
              <ul>
                {campus.students.map(student => (
                  <li key={student.id}>{student.firstName} {student.lastName}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No students in this house!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleCampus;
