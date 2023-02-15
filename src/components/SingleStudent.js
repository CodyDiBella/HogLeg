import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const SingleStudent = () => {
  const { studentId } = useParams();
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

  const handleDeleteStudentClick = async (id) => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    navigate("/students");
  };

  return (
    <div>
      {student && (
        <div>
          <h1>
            {student.firstName} {student.lastName}
          </h1>
          <img src={student.imageUrl} />
          <p>{`${student.firstName.charAt(0)}${
            student.lastName
          }@Hogwarts.com`}</p>
          <p>House Points: {student.housePoints}</p>
          <Link to={campus ? `/campuses/${campus.id}` : `/unassigned`}>
            <h2>
              {campus
                ? `${campus.name}`
                : "This person has not yet been sorted"}
            </h2>
          </Link>
          <button onClick={() => handleDeleteStudentClick(student.id)}>
            Delete Student
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
