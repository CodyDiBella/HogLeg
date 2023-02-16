import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmit: ', evt)

    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, imageUrl}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        navigate(`/students/${data.id}`); // Navigate to the new student's single view
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Clear the form
    setFirstName('');
    setLastName('');
    setImageUrl('');
  }

  function handleFirstNameChange(evt) {
    setFirstName(evt.target.value);
  }

  function handleLastNameChange(evt) {
    setLastName(evt.target.value);
  }

  function handleImageUrlChange(evt) {
    setImageUrl(evt.target.value);
  }

  return (
    <form className='addStudent' onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name: </label>
      <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleFirstNameChange} />
      <br />
      <label htmlFor="lastName">Last Name: </label>
      <input type='text' id='lastName' name='lastName' value={lastName} onChange={handleLastNameChange} />
      <br />
      <label htmlFor="imageUrl">Image URL: </label>
      <input type='URL' id='imageUrl' name='imageUrl' value={imageUrl} onChange={handleImageUrlChange} />
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default AddStudentForm;
