import React, { useState } from 'react';

const SortStudentForm = ({ campuses, student, onSort, onCancel }) => {
  const [selectedCampusId, setSelectedCampusId] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSort(selectedCampusId);
    setIsVisible(false);
  };

  const handleCancel = () => {
    setSelectedCampusId('');
    setIsVisible(false);
    onCancel();
  };

  const handleSortingHatClick = () => {
    setIsVisible(true);
  };

  return (
    <div>
      <button onClick={handleSortingHatClick}>Sorting Hat</button>
      {isVisible && (
        <form onSubmit={handleSubmit}>
          <label>
            Campus:
            <select
              name="campusId"
              value={selectedCampusId}
              onChange={(event) => setSelectedCampusId(event.target.value)}
            >
              <option value="">--Select Campus--</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Sort</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default SortStudentForm;
