import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto">
        <Link to="/" className="text-white text-lg font-bold">
          Task Manager
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;