import React from 'react';
import { Helmet } from 'react-helmet';
import Slider from '../components/Slider';
import 'animate.css';
import Estate from '../components/Estate';
import MapComponent from '../components/MapComponent';

export default function Home() {
  return (
    <div className='container'>
      <Helmet>
        <title>HavenInn - Home</title>
      </Helmet>
      <Slider />

      <div className='text-center mt-24 mb-10 '>
        <p className='text-xl font-bold animate__animated animate__flash lexend'>
          ENJOY THE PARIS VIBES WITH US</p>
      </div>
      <MapComponent />

      <div className='text-center mt-24 mb-10 opacity-80'>
        <p className=' text-xl font-bold animate__animated animate__flash lexend'>
          Featured Rooms</p>
      </div>
      <Estate />
    </div>
  );
}


