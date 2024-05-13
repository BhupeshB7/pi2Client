import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Bind the event listener
      window.addEventListener('click', handleClickOutside);
    }

    // Unbind the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={{ position: 'relative' }} ref={navbarRef}>
      <button
        onClick={toggleNavbar}
        style={{
          position: 'fixed',
          top: '10px',
          left: '240px',
          zIndex: 1000,
          fontSize: 30,
          color: isOpen ? 'Orange' : 'white',
          background: 'none',
          border: 'none'
        }}
      >
        {isOpen ? '✕' : ''}
      </button>
      <button
        onClick={toggleNavbar}
        style={{
          position: 'fixed',
          top: '10px',
          left: '20px',
          zIndex: 1000,
          fontSize: 35,
          color: isOpen ? 'Orange' : 'white',
          background: 'none',
          border: 'none'
        }}
      >
        {isOpen ? '' : '☰'}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '-100%', y: '-100%', backgroundColor: 'black', width: '285px', height: '100vh',borderBottomRightRadius:'7px' }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '-100%', y: '-100%' }}
            transition={{ type: 'tween', duration: 0.9 }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <ul className='navbar-ul'>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="nav-item">
                <a href="/">Home</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="nav-item">
                <a href="/v2/register">Sign up</a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="nav-item">
                <a href="/v2/login">LogIn</a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
