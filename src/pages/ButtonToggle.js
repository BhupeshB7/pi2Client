import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ButtonToggle = () => {
  const [isActive, setIsActive] = useState(false);
const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchButtonState = async () => {
      const response = await axios.get(`${apiUrl}/api/notice/button`);
      setIsActive(response.data.active);
    };

    fetchButtonState();
  }, []);

  const handleButtonClick = async () => {
    const response = await axios.post(`${apiUrl}/api/notice/button`, { active: !isActive });
    const newIsActive = !isActive;
  
    // Assuming the response contains the updated button information
    if (response.data && response.data.active) {
      // If the button is now active, go to the first link
      window.location.href = '/game/colorpridiction/admin/live';
    } else {
      // If the button is inactive, go to the second link
      window.location.href = '/admin/dashboard/game';
    }
  
    setIsActive(newIsActive);
  };
  

  return (
    <div>
      <Button variant='primary' className='m-1' onClick={handleButtonClick}>
        {isActive ? 'Game Over' : 'Game Start'}
      </Button>
      {/* <p>Button is {isActive ? 'Active' : 'Inactive'}</p> */}
    </div>
  );
};

export default ButtonToggle;
