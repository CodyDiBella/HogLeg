import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
<nav className="nav">
  <div>
    <Link to="/campuses">All Campuses</Link>
  </div>
  <div>
    <Link to="/students">All Students</Link>
  </div>
</nav>

  );
};

export default Navbar;
