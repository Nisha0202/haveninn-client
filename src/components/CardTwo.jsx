import React, { useEffect, useState, useContext } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider';

import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';

const CardTwo = ({ estate }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { usern } = useContext(AuthContext);

  //day contrain
  const oneDayBeforeBookingDate = new Date(estate.bookingDate);
  oneDayBeforeBookingDate.setDate(oneDayBeforeBookingDate.getDate() - 1);

  const today = new Date();
  const oneDayAfterToday = new Date();
  oneDayAfterToday.setDate(oneDayAfterToday.getDate() + 1);

  const [toast, setToast] = useState(false);


  const updateBookingDate = async () => {
    const { value: bookingDate } = await Swal.fire({
      title: 'Update Booking Date',
      input: 'date',
      inputValue: new Date(estate.bookingDate).toISOString().slice(0, 10),
      inputPlaceholder: 'Select a date',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update'
    })

    if (bookingDate) {
      const bookingDateObj = new Date(bookingDate);
      if (bookingDateObj >= oneDayAfterToday) {
        try {
          const { _id, ...estateWithoutId } = estate;
          const updatedEstate = { ...estateWithoutId, bookingDate };
          await axios.put(`https://heaveninnserver.vercel.app/rooms/${estate.id}`, updatedEstate);

          Swal.fire('Updated', 'Your booking date has been updated.', 'success').then(() => {
            setToast(true);
            setToast(true);
            setTimeout(() => {
              setToast(false);
            }, 2000);
            //   setTimeout(function(){
            //     window.location.reload();
            //  }, 2000);

          });
        } catch (error) {
          Swal.fire('Error', 'Failed to update booking date', 'error');
          console.error('Failed to update room status:', error);
        }
      } else {
        Swal.fire('Error', 'Your update date has to be at least one day after.', 'error');
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
        if (today <= oneDayBeforeBookingDate) {
          try {
            const { _id, ...estateWithoutId } = estate;
            const updatedEstate = { ...estateWithoutId, status: 'Available', bookingDate: null, bookedEmail: null };
            await axios.put(`https://heaveninnserver.vercel.app/rooms/${estate.id}`, updatedEstate);
            Swal.fire('Cancelled', 'Your booking has been cancelled.', 'success').then(() => {
              // window.location.reload();
            });
          } catch (error) {
            Swal.fire('Error', 'Failed to cancel booking', 'error');
            console.error('Failed to update room status:', error);
          }
        } else {
          Swal.fire('Error', 'Your cancle date has to be at least one day before.', 'error');

        }
      }
    })
  };



  const writeReview = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Write a Review',
      html:
        '<div class="flex items-center justify-between">' +
        '<label for="swal-input1" class="mr-2 star">Rating (1-5): </label>' +
        '<input id="swal-input1" class="border py-1 px-2 rounded" type="number" min="1" max="5">' +
        '</div>' +
        '<div class="mt-4">' +
        '<label for="swal-input2" class="block mb-2">Comment: </label>' +
        '<textarea id="swal-input2" class="border py-1 px-2 rounded w-full" placeholder="Enter your comment here..."></textarea>' +
        '</div>',
      customClass: {
        popup: 'bg-gray-100 text-gray-800',
        title: 'font-bold text-lg',
        content: 'text-sm'
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    });

    if (formValues) {
      const [rating, comment] = formValues;
      const username = usern.displayName; // Get the username from the logged-in user
      const timestamp = new Date().toISOString();
      const roomId = estate._id;

      if (!rating || !comment) {
        Swal.fire('Error', 'Please fill both rating and comment.', 'error');
        return;
      }

      const review = {
        username,
        rating,
        comment,
        timestamp,
        roomId
      };

      try {
        await axios.post('https://heaveninnserver.vercel.app/reviews', review);
        Swal.fire('Success', 'Your review has been posted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to post review', 'error');
        console.error('Failed to post review:', error);
      }
    }


  }

  const isBookedByCurrentUser = estate.status === 'Booked' && estate.bookedEmail === usern.email;

  return (
    <div>
      <div className="card w-[300px] h-96 py-4 bg-transparent border-0 rounded-xl gap-4 relative" data-aos="fade">
        <div className='indicator w-full'>
          <img className='w-full h-96 rounded-xl border-0' src={estate.image} />
        </div>
        <div className='bg-gray-300 h-32 bg-opacity-80 absolute w-full mb-4 bottom-0 flex flex-col items-center justify-center'>
          <p className='text-center pt-4 text-wrap bg-transparent'>{estate.price}£/per Night Booked for {estate.bookingDate.slice(0, 10)}</p>

          {isBookedByCurrentUser ? (
            <div className='bg-transparent gap-4 flex flex-row items-center justify-center my-4'>
              <a onClick={updateBookingDate} className='font-bold btn btn-sm text-cyan-700 text-base bg-transparent'>Update</a>
              <button onClick={cancelBooking} className='btn btn-sm font-bold  text-red-700 bg-transparent text-base'>Cancel</button>
              <button onClick={writeReview} className='btn btn-sm font-bold text-pink-700 bg-transparent text-base'>Review</button>
            </div>
          ) : (
            <div></div>)}
        </div>
        {toast &&
          <div className="toast toast-top toast-start">
            <div className="alert">
              <span>Update success.</span>
            </div>

          </div>
        }

      </div>
    </div>
  );
}

export default CardTwo;


