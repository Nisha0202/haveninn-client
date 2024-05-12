import React, { useEffect, useState, useContext } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const CardTwo = ({ estate }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { usern } = useContext(AuthContext);
  const updateBookingDate = async () => {
    const { value: bookingDate } = await Swal.fire({
      title: 'Update Booking Date',
      input: 'date',
      inputValue: estate.bookingDate,
      inputPlaceholder: 'Select a date',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update'
    });

    if (bookingDate) {
      try {
        const { _id, ...estateWithoutId } = estate;
        const updatedEstate = { ...estateWithoutId, bookingDate };
        await axios.put(`http://localhost:5000/rooms/${estate.id}`, updatedEstate);
        Swal.fire('Updated', 'Your booking date has been updated.', 'success').then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire('Error', 'Failed to update booking date', 'error');
        console.error('Failed to update room status:', error);
      }
    }
  };

  const cancelBooking = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { _id, ...estateWithoutId } = estate;
          const updatedEstate = { ...estateWithoutId, status: 'Available', bookingDate: null, bookedEmail: null };
          await axios.put(`http://localhost:5000/rooms/${estate.id}`, updatedEstate);
          Swal.fire('Cancelled', 'Your booking has been cancelled.', 'success').then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire('Error', 'Failed to cancel booking', 'error');
          console.error('Failed to update room status:', error);
        }
      }
    })
  };
  
  const isBookedByCurrentUser = estate.status === 'Booked' && estate.bookedEmail === usern.email;

  return (
    <div>
      <div className="card w-[300px] h-96 bg-transparent border-0 rounded-xl gap-4 relative" data-aos="fade">
        <div className='indicator w-full'>
          <img className='w-full h-96 rounded-xl border-0' src={estate.image} />
        </div>
        <div className='bg-gray-300 py-4 h-46 bg-opacity-80 absolute w-full mb-4 bottom-0 flex flex-col items-center justify-end'>
          <p className='text-center text-wrap bg-transparent font-semibold'>{estate.description}</p>
          <p className='text-center text-wrap bg-transparent'>{estate.price}£ Booked for {estate.bookingDate}</p>
          {isBookedByCurrentUser ? (
            <div className='bg-transparent gap-4 flex flex-col items-center justify-center'>
              <button onClick={updateBookingDate} className='btn btn-sm rounded-md border-b-2 border-cyan-800 text-cyan-800 bg-transparent mt-2 font-semibold text-base'>Update Booking Date</button>
              <button onClick={cancelBooking} className='btn btn-sm rounded-md border-b-2 border-red-700 text-red-700 bg-transparent font-semibold text-base'>Cancel Booking</button>

            </div>
          ) : (
            <div></div>  )}
        </div>
      </div>
    </div>
  );
}

export default CardTwo;


