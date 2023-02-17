import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UpdateStudentForm from "./UpdateStudentForm";

const SingleStudent = () => {
  const { studentId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [student, setStudent] = useState(null);
  const [campus, setCampus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudent() {
      const response = await fetch(`/api/students/${studentId}`);
      const data = await response.json();
      setStudent(data);
      setCampus(data.campus);
    }
    fetchStudent();
  }, [studentId]);

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const response = await fetch(`/api/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });
      const data = await response.json();
      setStudent(data);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStudentClick = async (id) => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    navigate("/students");
  };

  const handleSortingHatClick = () => {
    navigate(`/students/${studentId}/transfer`);
  };

  return (
    <div className="singleViews">
      {student && (
        <div className="studentViews">
          <h1>
            {student.firstName} {student.lastName}
          </h1>
          <img src={student.imageUrl} />
          <p>{`${student.firstName.charAt(0)}${
            student.lastName
          }@Hogwarts.com`}</p>
          <p>House Points: {student.housePoints}</p>
          {!showForm && (
            <button onClick={() => setShowForm(true)}>Update Student</button>
          )}
          {showForm && (
            <UpdateStudentForm
              student={student}
              onUpdate={handleUpdateStudent}
              onCancel={() => setShowForm(false)}
            />
          )}
          <Link to={campus ? `/campuses/${campus.id}` : `/unassigned`}>
            <h2 className="houseTitle">
              {campus
                ? `${campus.name}`
                : "This person has not yet been sorted"}
            </h2>
          </Link>
          <button onClick={handleSortingHatClick}>Sorting Hat</button>
          <button onClick={() => handleDeleteStudentClick(student.id)}>
            Delete Student
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
