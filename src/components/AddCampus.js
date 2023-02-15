import React from 'react';
import AddCampusForm from './AddCampusForm';

const AddCampus = ({ setCampuses }) => {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/campuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error creating campus');
      }
      const newCampus = await response.json();
      setCampuses(prevCampuses => [...prevCampuses, newCampus]);
      alert('Campus created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create campus');
    }
  };

  return (
    <div>
      <h1>Add Campus</h1>
      <AddCampusForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddCampus;
