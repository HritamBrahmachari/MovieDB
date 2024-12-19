import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Desc.css';
const Desc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state || {};
  console.log(show.summary);

  if (!show) {
    return (
      <div className="error-container">
        <p>No show data available.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
   
    <div className="show-details-container">
      
      <div className="show-header">
        <h1>{show.name}</h1>
        <span className="rating">Rating: {location.state.show.rating.average || 'N/A'}</span>
      </div>
      <div className="show-content">
        <img src={show.image.original} alt={show.name} className="show-image" />
        <div className="show-info">
          <p><strong>Premiered:</strong> {show.premiered || 'Unknown'}</p>
          <p><strong>Genres:</strong> {show.genres.join(', ') || 'Not specified'}</p>
          <div className="show-summary" dangerouslySetInnerHTML={{__html:show.summary}} />
        </div>
      </div>
      <center>
       <button onClick={() => navigate('/')} className="back-button">
        Back to Home
      </button>
      </center>
    </div>
    </>
  );
};

export default Desc;