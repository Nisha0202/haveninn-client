import React, { useEffect, useState, useContext } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';

import { useNavigate } from 'react-router-dom';


import axios from 'axios';

   
const Card = ({ estate }) => {
  useEffect(() => {
    AOS.init();
  }, []);
 const [reviews, setReviews] = useState([]);


  // Inside your component
  const navigate = useNavigate();

  const { usern } = useContext(AuthContext);

  const handleViewProperty = () => {
    if (usern) {

      navigate(`/property_details/${estate.id}`);

    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/reviews/${estate._id}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    fetchReviews();
}, [estate._id]);

  return (
    <div >
      <div className="card w-[300px] h-96 bg-transparent border-0 rounded-xl gap-4 relative" data-aos="fade">
        <div className='indicator w-full '>
          <img className='w-full h-96 rounded-xl border-0' src={estate.image} />
        </div>

        <div className='bg-gray-300 p-3 h-32 bg-opacity-80 absolute w-full mb-4 bottom-0 flex flex-col items-center justify-end'>
          <p className='text-center text-wrap bg-transparent font-semibold'>{estate.description}</p>
          <div className='flex gap-4 justify-center'>
                <p className='text-center text-wrap bg-transparent'>{estate.price}£/per Night</p>   <p className=''>
                    Total Reviews: {reviews.length}
                </p>
          </div>
      
          <div className='btn btn-sm rounded-md boreder-b-2 border-zinc-500  text-cyan-900 bg-transparent mt-2 font-bold text-base' onClick={handleViewProperty}>
            Book Now</div>

        </div>

      </div>
    </div>


  );
}
export default Card;








