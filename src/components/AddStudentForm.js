import React, { useState } from 'react';

const defaultImageUrl = 'https://i.pinimg.com/originals/35/d1/93/35d19306ddaa70da7790bf440c2860c8.jpg';

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!firstName || !lastName) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    const data = imageUrl ? { firstName, lastName, imageUrl } : { firstName, lastName, imageUrl: defaultImageUrl };
    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Redirect to the new student's page
        window.location.href = `/students/${data.id}`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Clear the form and error message
    setFirstName('');
    setLastName('');
    setImageUrl('');
    setErrorMessage('');
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
    <div className="addCampusContainer">
    <form className='addStudent addForms' onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name: </label>
      <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleFirstNameChange} required />
      <br />
      <label htmlFor="lastName">Last Name: </label>
      <input type='text' id='lastName' name='lastName' value={lastName} onChange={handleLastNameChange} required />
      <br />
      <label htmlFor="imageUrl">Image URL: </label>
      <input type='URL' id='imageUrl' name='imageUrl' value={imageUrl} onChange={handleImageUrlChange} />
      <br />
      <button type='submit'>Submit</button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
    </div>
  );
}

export default AddStudentForm;

