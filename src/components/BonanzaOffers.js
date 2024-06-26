// BonanzaOffers.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
const formatActivationTime = (activationTime) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata', 
  };
  return new Date(activationTime).toLocaleString('en-IN', options);
};

const BonanzaOffers = () => {
  const [userId, setUserId] = useState('');
  const [downlineCount, setDownlineCount] = useState(0);
  const [downlineUsers, setDownlineUsers] = useState([]);
  const [error, setError] = useState(null);
const apiUrl = process.env.REACT_APP_API_URL;
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/bonanzaOffers/${userId}`);
      const { count, details } = response.data;
      setDownlineCount(count);
      setDownlineUsers(details);
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Network error. Please try again.');
      }
      setDownlineCount(0);
      setDownlineUsers([]);
    }
  };

  return (
    <div className="bonanza-container">
      <h2 className="bonanza-heading">Bonanza Offers</h2>
      <div className="input-container">
         <input
          type="text"
          placeholder='Enter User Id'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ width: "210px",padding:'5px' }}
        />
        <Button  className='m-1 btn-grad' onClick={fetchData}>Check</Button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {downlineCount > 0 && (
        <div className="details-container">
          <p className="downline-count">Total Direct: {downlineCount}</p>
          <div className='table-responsive'>
          <table className="table table-bordered table-striped ">
            <thead>
              <tr>
                <th>Name</th>
                <th>UserId</th>
                <th>Mobile</th>
                <th>Package</th>
                <th>Activation Time</th>
              </tr>
            </thead>
            <tbody>
              {downlineUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.userId}</td>
                  <td>{user.mobile}</td>
                  <td>{user.package}</td>
                  <td>{formatActivationTime(user.activationTime)}</td>
                </tr>
              ))}
            </tbody>
          </table> 
          </div>
        </div>
      )}
    </div>
  );
};

export default BonanzaOffers;
