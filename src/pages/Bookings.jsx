import React, { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../FirebaseProbider/FirbaseProvider'
import CardTwo from '../components/CardTwo';
import axios from 'axios';



export default function Bookings() {
const { usern } = useContext(AuthContext);

    const [data, setData] = useState([]);
    useEffect(() => {
      fetch(`https://heaveninnserver.vercel.app/rooms/user?email=${usern.email}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error));
    }, [usern,data]);
    
    
    // useEffect(() => {
    //   axios.get(`https://heaveninnserver.vercel.app/rooms/user?email=${usern.email}`, {withCredentials: true})
    //     .then(response => {
    //       setData(response.data);

    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }, [usern]);
    
  
  return (
    <div className='flex justify-center items-center pb-12'>
         <div className='flex flex-wrap flex-col gap-4 md:flex-row md:justify-between lg:justify-between md:gap-16'>

{data.map((estate, index) => (
        <CardTwo key={index} estate={estate} />
      ))}
    </div>
    </div>
   
  )
}
