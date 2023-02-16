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
      const { students, ...updatedCampusWithoutStudents } = updatedCampus; // Exclude students from the updated campus object
      const response = await fetch(`/api/campuses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCampusWithoutStudents), // Only send the updated campus data without the associated students
      });
      const data = await response.json();
      setCampus(data);
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
        body: JSON.stringify({ campusId: null }), // Set the student's campus ID to null
      });
      const data = await response.json();
      setCampus((prevCampus) => {
        // Create a new campus object with the updated student list
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
