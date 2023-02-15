import React, { useState } from 'react';

const AddCampusForm = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmit: ', evt)

    // Make an AJAX request to the server
    fetch('/api/campuses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, imageUrl, address, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Clear the form
    setName('');
    setImageUrl('');
    setAddress('');
    setDescription('');
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleImageUrlChange(evt) {
    setImageUrl(evt.target.value);
  }

  function handleAddressChange(evt) {
    setAddress(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  return (
    <form className='addCampus' onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type='text' id='name' name='name' value={name} onChange={handleNameChange} />
      <br />
      <label htmlFor="imageUrl">Image URL: </label>
      <input type='URL' id='imageUrl' name='imageUrl' value={imageUrl} onChange={handleImageUrlChange} />
      <br />
      <label htmlFor="address">Address: </label>
      <input type='text' id='address' name='address' value={address} onChange={handleAddressChange} />
      <br />
      <label htmlFor="description">Description: </label>
      <input type='text' id='description' name='description' value={description} onChange={handleDescriptionChange} />
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default AddCampusForm;
