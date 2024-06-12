import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';

import imageSpinner from '../../assets/imageSpinner.gif'
const App = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  const controller = new AbortController();
  const signal = controller.signal;

  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Check if the file size is within the limit (500KB)
      if (selectedFile.size <= 300 * 1024) {
        setImage(selectedFile);
      } else {
        alert('File size exceeds 300KB. Please choose a smaller file.');
        // Optionally, you can clear the input field
        event.target.value = null;
        setImage(null);
      }
    }
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      await axios.post('https://mlm-gc1b.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Fetch the updated images after upload
      const response = await axios.get('https://mlm-gc1b.onrender.com/images', { signal });
      setImages(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mlm-gc1b.onrender.com/delete/${id}`, { signal });

      // Fetch the updated images after deletion
      const response = await axios.get('https://mlm-gc1b.onrender.com/images', { signal });
      setImages(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://mlm-gc1b.onrender.com/images', { signal });
console.log('Server Response:', response);
setImages(response.data);

        setLoadingImages(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchImages();

    // Cleanup function to cancel pending requests when the component unmounts
    return () => {
      controller.abort();
    };
  }, [signal]);
//   console.log('Image Data:', images.data)

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  return (
    <Container>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{maxWidth:'200px'}} />
      <Button variant="primary" className='m-1' onClick={handleUpload} disabled={!image}>
        Upload Image
      </Button>

      <div style={{ marginTop: '20px' }}>
        {loadingImages ? (
          <p className='text-center'><img src={imageSpinner} height='55px' width='55px' alt='spinner'/></p>
        ) : (
            <Container>
            <Row>
              <Col sm={12} md={6} lg={4} className='CarouselImage'>
                {images.map((img) => (
                  <div  key={img._id} className="max-w-sm rounded overflow-hidden shadow-lg m-1">
                    <img
                      variant="top"
                      src={`data:${img.contentType};base64,${arrayBufferToBase64(img.data.data)}`}
                      height='165px'
                      className='adminCarouselImage'
                      width='100%'
                    />
                    <div>
                      <Button variant="danger" className='m-1' onClick={() => handleDelete(img._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
          
        )}
      </div>
    </Container>
  );
};

export default App;
