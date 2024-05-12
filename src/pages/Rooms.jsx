import React, { useEffect, useState } from 'react'
import Card from '../components/Card';



export default function Rooms() {

    const [data, setData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/rooms')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error));
    }, []);
  
  
  return (
    <div className='flex justify-center items-center pb-12'>
         <div className='flex flex-wrap flex-col gap-4 md:flex-row md:justify-between lg:justify-between md:gap-16'>

{data.map((estate, index) => (
        <Card key={index} estate={estate} />
      ))}
    </div>
    </div>
   
  )
}