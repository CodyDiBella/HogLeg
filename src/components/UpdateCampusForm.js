import React, { useState } from 'react';

const UpdateCampusForm = ({ campus, onUpdate }) => {
  const [name, setName] = useState(campus.name);
  const [address, setAddress] = useState(campus.address);
  const [imageUrl, setImageUrl] = useState(campus.imageUrl);
  const [description, setDescription] = useState(campus.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/campuses/${campus.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          imageUrl,
          description,
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
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <button type="submit">Update</button>
            <button onClick={oncancel}>Cancel</button>
    </form>
  );
};


export default UpdateCampusForm;
