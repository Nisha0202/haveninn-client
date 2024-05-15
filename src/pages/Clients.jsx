import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Clients = () => {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get('https://heaveninnserver.vercel.app/reviews');
          setReviews(response.data);
        } catch (error) {
          console.error('Failed to fetch reviews:', error);
        }
      };
    
      fetchReviews();
    }, []);
    
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 px-4'>
    
        {reviews.map(review => (
          <div key={review._id} className='card bg-white p-4 rounded-xl border-2'>
            <div className='card-header'>
              <h5 className='pb-0.4 font-semibold'>{review.username}</h5>
              <p className='text-xs text-gray-500'>{new Date(review.timestamp).toLocaleDateString()}</p>
            </div>
            <div className='card-body px-0'>
              <p className='text-gray-700 text-left'>{review.comment}</p>
            </div>
            <div className='card-footer flex justify-end'>
              <span className='text-cyan-600'>Rating: {review.rating} / 5</span>
            </div>
          </div>
        ))}
      </div>
    );

    
};

export default Clients;

