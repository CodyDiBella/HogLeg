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

  const handleUpdateCampus = async (updatedCampus) => {
    try {
      const { students, ...updatedCampusWithoutStudents } = updatedCampus;
      const response = await fetch(`/api/campuses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCampusWithoutStudents), 
      });
      const data = await response.json();
      setCampus(prevCampus => ({...prevCampus, ...updatedCampusWithoutStudents})); 
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleUnregisterStudent = async (studentId) => {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campusId: null }), 
      });
      const data = await response.json();
      setCampus((prevCampus) => {
        const updatedStudents = prevCampus.students.filter(
          (student) => student.id !== studentId
        );
        return { ...prevCampus, students: updatedStudents };
      });
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
    <div className="singleViews">
      {campus && (
        <div>
          <h1>{campus.name}</h1>
          <img src={campus.imageUrl} alt={campus.name} />
          <p>Address: {campus.address}</p>
          <p>{campus.description}</p>
          <div className="singleViewsButt">
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
          <button onClick={() => handleDeleteClick(campus.id)}>
            Delete House
          </button>
          </div>
          {campus.students && campus.students.length > 0 && (
            <div>
              <p>Students:</p>
              <ul>
                {campus.students.map((student) => (
                  <li key={student.id}>
                    <Link to={`/students/${student.id}`}>
                      {student.firstName} {student.lastName}
                    </Link>
                    <button onClick={() => handleUnregisterStudent(student.id)}>
                      Unregister
                    </button>
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
