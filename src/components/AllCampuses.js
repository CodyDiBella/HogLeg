import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllCampuses = () => {
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCampuses() {
      const response = await fetch('/api/campuses');
      const data = await response.json();
      setCampuses(data);
    }
    fetchCampuses();
  }, []);

  const handleAddCampusClick = () => {
    navigate('/add-campus');
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`/api/campuses/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setCampuses(campuses.filter((campus) => campus.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='campuses'>
      <h1 className='titleNames'>All Campuses</h1>
      <button onClick={handleAddCampusClick}>Add Campus</button>
      {campuses.map((campus) => (
        <div key={campus.id}>
          <button onClick={() => handleDeleteClick(campus.id)}>X</button>
          <Link to={`/campuses/${campus.id}`}>
            <h1 className='largeName'>{campus.name}</h1>
            <img src={campus.imageUrl} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllCampuses;
