import React, { useEffect } from 'react'
import { useState } from "react";
import Card from '../components/Card';

export default function Rooms() {
  const [data, setData] = useState([]);

  const fetchData = () => {
   // Fetch sorted data
fetch('http://localhost:5000/rooms?sort=price')
.then(response => response.json())
.then(data => setData(data))
.catch(error => console.error('Error:', error));

  };

  useEffect(fetchData, []);

  return (
    <div className='flex flex-col justify-center items-center pb-12'>
      <div className='btn btn-sm mb-8' onClick={fetchData}>Sort by Price</div>
      <div className='flex flex-wrap flex-col gap-4 md:flex-row md:justify-between lg:justify-between md:gap-16'>
        {data.map((estate, index) => (
          <Card key={index} estate={estate} />
        ))}
      </div>
    </div>
  )
}
