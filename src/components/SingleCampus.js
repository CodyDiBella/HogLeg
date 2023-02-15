import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const SingleCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campus, setCampus] = useState(null);

  useEffect(() => {
    async function fetchCampus() {
      const response = await fetch(`/api/campuses/${id}`);
      const data = await response.json();
      setCampus(data);
    }
    fetchCampus();
  }, [id]);

  const handleDeleteClick = async (id) => {
    try {
      await fetch(`/api/campuses/${id}`, {
        method: "DELETE",
      });
      navigate("/campuses");
    } catch (error) {
      console.error(error);
    }
  };

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
                {campus.students.map((student) => (
                  <li key={student.id}>
                    <Link to={`/students/${student.id}`}>
                      {student.firstName} {student.lastName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No students in this house!</p>
          )}
          <button onClick={() => handleDeleteClick(campus.id)}>
            Delete House
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleCampus;
