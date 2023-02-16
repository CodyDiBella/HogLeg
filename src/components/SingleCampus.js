import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UpdateCampusForm from "./UpdateCampusForm";

const SingleCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campus, setCampus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchCampus() {
      const response = await fetch(`/api/campuses/${id}`);
      const data = await response.json();
      setCampus(data);
    }
    fetchCampus();
  }, [id]);

  const handleUpdateCampus = async (updatedFields) => {
    try {
      const response = await fetch(`/api/campuses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      setCampus({ ...campus, ...data });
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  

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
          {!showForm && (
            <button onClick={() => setShowForm(true)}>Update House</button>
          )}
          {showForm && (
            <UpdateCampusForm
              campus={campus}
              onUpdate={handleUpdateCampus}
              onCancel={() => setShowForm(false)}
            />
          )}
          {showForm && (
            <button onClick={() => setShowForm(false)}>Cancel</button>
          )}
          <button onClick={() => handleDeleteClick(campus.id)}>
            Delete House
          </button>
          {campus.students && campus.students.length > 0 && (
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
          )}
          {(!campus.students || campus.students.length === 0) && (
            <p>No students in this house!</p>
          )}
        </div>
      )}
    </div>
  );  
};

export default SingleCampus;
