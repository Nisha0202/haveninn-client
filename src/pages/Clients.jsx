import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Clients = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
   
        fetch('review.json')
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
               <Helmet>
        <title>HavenInn - Clients</title>
      </Helmet>
            {reviews.map(review => (
                <div key={review.reviewId} className='card bg-white p-4 rounded-md border-2'>
                    <div className='card-header'>
                        <h5 className='text-lg font-bold'>{review.author}</h5>
                        <p className='text-sm text-gray-500'>{review.date}</p>
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

