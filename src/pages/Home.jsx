import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Slider from '../components/Slider';
import 'animate.css';
import Estate from '../components/Estate';
import MapComponent from '../components/MapComponent';
import Clients from './Clients';
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(true); // Set initial state to true

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='container'>
      <Helmet>
        <title>HavenInn - Home</title>
      </Helmet>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        style={{
          content: {
            width: '300px',
            height: '200px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }
        }}
      >
        <div className='w-full flex place-content-end'><button onClick={closeModal}><IoCloseOutline/></button></div>
        <div className='font-bold text-xl w-full text-center grid place-content-center mt-5'>15% OFF on this <div className='text-pink-400 text-3xl'>'Mother's Day'</div></div>
        
      </Modal>

      <Slider />

      <div className='text-center mt-16 md:mt-32 mb-6 md:mb-10'>
        <p className='text-lg font-bold animate__animated animate__flash lexend'>
          ENJOY THE PARIS VIBES WITH US</p>
      </div>

      <MapComponent />

      <div className='text-center mt-16 md:mt-32 mb-6 md:mb-10 opacity-80'>
        <p className='text-lg font-bold animate__animated animate__flash lexend'>
          Featured Rooms</p>
      </div>

      <Estate />

      <div className='text-center mt-12 md:mt-24 opacity-80 mb-6 md:mb-10'>
        <p className='text-lg font-bold animate__animated animate__flash lexend'>
          Customer Reviews</p>
      </div>

      <div className='mb-16'>
        <Clients/>
      </div>
    </div>
  );
}
