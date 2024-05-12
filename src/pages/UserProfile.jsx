import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../FirebaseProbider/FirbaseProvider'
export default function UserProfile() {
    const { usern } = useContext(AuthContext);
  return (

    <div className='container flex flex-col items-center'>
    <Helmet>
      <title>HavenInn - User Profile</title>
    </Helmet>

    <div className='min-h-40 text-center py-16 flex flex-col items-center gap-4'>
      <img src={usern.photoURL} className='w-20 h-20'/>
      <p className='text-indigo-700 md:text-xl text-base text-center font-bold animate__animated animate__flash'>{usern.displayName} </p>
    </div>
    
  </div>
  )
}
