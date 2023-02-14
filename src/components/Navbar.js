import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/campuses">All Campuses</Link>
        </li>
        <li>
          <Link to="/students">All Students</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
