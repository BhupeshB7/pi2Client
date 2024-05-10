import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  initial: {
    border: '7px solid transparent',
    backgroundImage: 'linear-gradient(to right, #fa709a, #fee140)',
    backgroundClip: 'padding-box',
    backgroundOrigin: 'padding-box',
  },
  hover: {
    borderImage: 'linear-gradient(to right, #fa709a 0%, #fee140 100%) 1',
    borderImageSlice: 1,
  },
};

const Button = ({ onClick,children }) => {
  return (
    <motion.button
    onClick={onClick}
      initial="initial"
      whileHover="hover"
      variants={buttonVariants}
      style={{
        background: 'black',
        padding: '10px 35px',
        color: 'rgb(57, 34, 34)',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        borderRadius: '7px',
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
