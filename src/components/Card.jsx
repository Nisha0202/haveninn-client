import React, { useEffect, useState, useContext } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';

import { useNavigate } from 'react-router-dom';

const Card = ({ estate }) => {
  useEffect(() => {
    AOS.init();
  }, []);



  // Inside your component
  const navigate = useNavigate();

  const { usern } = useContext(AuthContext);

  const handleViewProperty = () => {
    if (usern) {
      // If usern exists, redirect to /property_details/id
      // navigate('/property_details/${estate.id}');
      navigate(`/property_details/${estate.id}`);

    } else {
      // If usern does not exist, redirect to /login
      navigate('/login');
    }
  };



  return (
    <div >
      <div className="card w-[300px] h-96 bg-transparent border-0 rounded-xl gap-4 relative" data-aos="fade">
        <div className='indicator w-full '>
          {/* <span className="indicator-item badge rounded-full right-3 p-3 bg-red-300 font-semibold border-0 ">{estate.status}</span> */}
          <img className='w-full h-96 rounded-xl border-0' src={estate.image} />
        </div>

        <div className='bg-gray-300 p-3 h-28 bg-opacity-60 absolute w-full mb-4 bottom-0 flex flex-col items-center justify-end'>
          <p className='text-center text-wrap bg-transparent font-semibold'>{estate.description}</p>
          <div className='btn btn-sm rounded-lg border-0 bg-transparent mt-2 font-bold text-base' onClick={handleViewProperty}>
            Book Now</div>

        </div>


        {/* <div className='grid grid-cols-5 grid-rows-1 gap-3 py-2'>
       
        <p className='col-span-3'>{estate.price}</p>
        <p className='col-span-2 text-right'>{estate.roomsize}</p>    
    
      </div> */}

        {/* <ul className='flex flex-wrap gap-2 pt-2 border-t-2 h-16'>
        <span className='font-semibold'>Reviews:</span>
        {estate.reviews.slice(0, 2).map((review, index) => (
          <p key={index}>{review}</p>
        ))}
        <p>...</p>
      </ul> */}

      </div>
    </div>


  );
}
export default Card;








