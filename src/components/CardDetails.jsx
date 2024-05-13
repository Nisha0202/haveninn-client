import React from 'react'
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom'
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../FirebaseProbider/FirbaseProvider'

export default function CardDetails() {

    const { usern } = useContext(AuthContext);
    const estates = useLoaderData();
    const { id } = useParams();
    const estate = estates.find(estate => estate.id === id);
    console.log(estate);
    if (!estate) {
        return <div>No estate found with id {id}</div>;
    }

    const today = new Date();
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(today.getDate() + 1);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const confirmBooking = async () => {
        if (startDate < twoDaysFromNow) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please choose a date at least one day before!',
          });
          return;
        }
      
        if (estate.status !== 'Available') {
          Swal.fire('Error', 'Room not available', 'error');
          return;
        }
      
        try {
          const { _id, ...estateWithoutId } = estate;
          startDate.setHours(0, 0, 0, 0); 
          const updatedEstate = { ...estateWithoutId, status: 'Booked', bookingDate: startDate, bookedEmail: usern.email };
          await axios.put(`http://localhost:5000/rooms/${estate.id}`, updatedEstate);
          Swal.fire('Success', 'The room has been booked!', 'success').then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire('Error', 'Failed to update room status', 'error');
          console.error('Failed to update room status:', error);
        }
      };
      
      



    return (
        <div className='py-6 border-2 rounded-md px-2 lg:px-6 mb-3'>
            <div className='flex flex-col lg:flex-row gap-4 md:gap-8 h-full'>
                {/* details */}
                <div className='w-full'>
                    <div className="flex flex-col w-full gap-2">
                        <div className='flex flex-col gap-4 intent'>
                            <p className='text-gray-600 text-base border-b-2 py-2'>{estate.description}</p>
                            <p className=' font-normal lg:text-sm/8 text-xs/9'><span className='font-bold lexend lg:text-sm/8 text-xs'>Price:</span> {estate.price}£</p>

                            <table className='max-w-80 text-xs h-20'>
                                <tbody className='text-left'>
                                    <tr >
                                        <td>Status:</td>
                                        <th>{estate.status}</th>
                                    </tr>
                                    <tr>
                                        <td>Area:</td>
                                        <th>{estate.roomsize}</th>
                                    </tr>
                                    <tr className=''>
                                        <td>Special Offers:</td>
                                        <th className='text-wrap'>{estate.specialOffers}</th>
                                    </tr>
                                    

                                </tbody>
                            </table>
                            <div className='btn font-bold bg-pink-300' onClick={openModal}>Book the Room</div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={{
                                    content: {
                                        width: '80%',
                                        height: '70%',
                                        margin: 'auto',
                                        backgroundColor: '#f5f5f5',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '12px',
                                    },
                                }}
                                    contentLabel="Room Details"  >
                                <h2 className='text-xl font-bold bg-transparent'>Room Details</h2>
                                <p className='bg-transparent'>{estate.description}</p>
                                <p className='bg-transparent'>Price Per Night: {estate.price}£</p>
                                <p className='bg-transparent'>Status: {estate.status}</p>
                                <p className='bg-transparent'>Room Size: {estate.roomsize}</p>
                                <div className='flex flex-col gap-3 items-center justify-center rounded-md'>
                                    <label htmlFor="">Choose a date:</label>
                                    <div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            monthsShown={1}
                                            minDate={twoDaysFromNow}  />

                                    </div>
                                </div>

                                <button onClick={confirmBooking} className='btn bg-cyan-600 rounded-md btn-sm mt-6'>Confirm Booking</button>

                                <div className='btn btn-sm rounded-md' onClick={closeModal}>Cancle</div>
                            </Modal>

                            <div className="lg:flex lg:flex-row gap-4 hidden">

                                {estate.roomImages.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt="" className=" w-80 h-80 bg-transparent border-2 rounded-xl" />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className='lg:w-2/3 w-full lg:h-[585px] h-80 md:w-72 mx-auto lg:mx-0 rounded-2xl' >
                    <img src={estate.image} alt="" className='w-full h-full rounded-xl border-[2px] border-base-400 object-fill' />
                </div>

            </div>
        </div>
    )
}

