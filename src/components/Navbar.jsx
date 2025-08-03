// frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg z-50 sticky top-0"> {/* Added z-10 for layering */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center rounded-lg">
        {/* Logo */}
        <div className="flex-shrink-0 ">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Basti Ki Pathshala Logo" className="h-20 w-auto rounded-md " /> {/* Adjust h-size as needed */}
            <span className="text-4xl font-extrabold text-blue-900 hidden md:block">Basti Ki Pathshala</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700  hover:text-blue-900 font-bold text-lg transition duration-300 transform hover:scale-105">
            Home
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-900 font-bold text-lg transition duration-300 transform hover:scale-105">
            Register
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-900 font-bold text-lg transition duration-300 transform hover:scale-105">
            Admin
          </Link>
          <a
            href="https://bastikipathshala.org/donate/" // Replace with actual donate link
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-green-900 text-white font-semibold rounded-full shadow-md hover:bg-green-300 transition duration-300 transform hover:scale-105"
          >
            Donate
          </a>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg pb-4 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Link to="/" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium text-lg transition duration-200 py-2">
            Home
          </Link>
          <Link to="/register" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium text-lg transition duration-200 py-2">
            Register
          </Link>
          <Link to="/admin" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium text-lg transition duration-200 py-2">
            Admin
          </Link>
          <a
            href="https://bastikipathshala.org/donate/" // Replace with actual donate link
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}
            className="w-4/5 text-center px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Donate
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;