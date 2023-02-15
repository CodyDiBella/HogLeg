import React, { useState, useEffect } from 'react';

const AllCampuses = () => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    async function fetchCampuses() {
      const response = await fetch('/api/campuses');
      const data = await response.json();
      setCampuses(data);
    }
    fetchCampuses();
  }, []);

  return (
    <div>
      <h1>All Campuses</h1>
      {campuses.map(campus => (
        <div key={campus.id}>
          <h2>{campus.name}</h2>
          <img src={campus.imageUrl} />
          <p>Address: {campus.address}</p>
          <p>{campus.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllCampuses;
