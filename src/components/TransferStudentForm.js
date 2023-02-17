import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TransferStudentForm() {
  const [campusList, setCampusList] = useState([]);
  const [campusId, setCampusId] = useState("");
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampuses = async () => {
      const response = await fetch("/api/campuses");
      const data = await response.json();
      setCampusList(data);
    };
    fetchCampuses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/students/${studentId}/campus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campusId }),
      });
      if (response.ok) {
        navigate(`/students/${studentId}`);
      } else {
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${studentId}`);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        setCampusId(data.campus?.id || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudent();
  }, [studentId]);

  return (
    <div className="sortingHat addForms">
      <form onSubmit={handleSubmit}>
        <label htmlFor="campus">Choose a house!: </label>
        <select
          id="campus"
          name="campus"
          value={campusId}
          onChange={(event) => setCampusId(event.target.value)}
        >
          <option value="">Choose your house</option>
          {campusList.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
        <button type="submit">Transfer Student</button>
      </form>
    </div>
  );
}

export default TransferStudentForm;
