import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleStudent = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [campus, setCampus] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      const response = await fetch(`/api/students/${studentId}`);
      const data = await response.json();
      setStudent(data);
      setCampus(data.campus);
    }
    fetchStudent();
  }, [studentId]);

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
          <Link to={`/campuses/${campus?.id}`}>
            <h2>
              {campus
                ? `${campus.name}`
                : "This person has not yet been sorted"}
            </h2>
          </Link>{" "}
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
