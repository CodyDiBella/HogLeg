import React, { useState } from 'react';

const UpdateStudentForm = ({ student, onUpdate, onCancel }) => {
  const [updatedStudent, setUpdatedStudent] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    imageUrl: student.imageUrl,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/students/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: updatedStudent.firstName,
          lastName: updatedStudent.lastName,
          imageUrl: updatedStudent.imageUrl,
        }),
      });
      const updatedFields = await response.json(); // Get updated fields
      onUpdate(updatedFields); // Pass updated fields to onUpdate callback
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={updatedStudent.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={updatedStudent.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={updatedStudent.imageUrl} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateStudentForm;
