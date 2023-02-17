import React, { useState } from 'react';

const defaultImageUrl =
  'https://secretchicago.com/wp-content/uploads/2022/09/harrypotter5.jpg1_-1024x683.jpg';

const AddCampusForm = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmit: ', evt);

    fetch('/api/campuses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        imageUrl: imageUrl || defaultImageUrl,
        address,
        description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.href = `/campuses/${data.id}`;
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
    <div className="addCampusContainer">
    <form className="addCampus addForms" onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required />
      <br />
      <label htmlFor="imageUrl">Image URL: </label>
      <input
        type="URL"
        id="imageUrl"
        name="imageUrl"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      <br />
      <label htmlFor="address">Address: </label>
      <input type="text" id="address" name="address" value={address} onChange={handleAddressChange} required />
      <br />
      <label htmlFor="description">Description: </label>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={handleDescriptionChange}
      required />
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AddCampusForm;
