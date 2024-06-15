import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function WithdrawalSummary() {
  const [withdrawalData, setWithdrawalData] = useState({
    yesterdayAmount: 0,
    todayAmount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/withdraw/allAmounts/summary`);
        setWithdrawalData(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel ongoing requests
      const source = axios.CancelToken.source();
      source.cancel('Component unmounted');
    };
  }, []);

  const handleError = (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      setError('Error fetching Withdrawal Summary:', error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='m-2'>
        <Container className='amountSummary '>
          <h2 className='underline text-orange-800'>Withdrawal Summary</h2>
          <p className="text-amber-700">Yesterday's Amount:<b className='text-md'>{withdrawalData.yesterdayAmount} ₹</b> </p>
          <p>Today's Amount: <b className='text-md'>{withdrawalData.todayAmount} ₹</b> </p>
          <p>Today's Approved Amount: <b className='text-md'>{withdrawalData.todayApprovedAmount} ₹</b> </p>
        </Container>
        </div>
      )}
    </div>
  );
}

export default WithdrawalSummary;
