import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Rooms() {
  const [data, setData] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const fetchData = (sort = false) => {
    let url = 'http://localhost:5000/rooms';
    if (sort) {
      url += '?sort=price';
    }
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  };

  const toggleSort = () => {
    fetchData(!isSorted);
    setIsSorted(!isSorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center pb-12'>
      <div className='btn btn-sm mb-8' onClick={toggleSort}>Sort by Price</div>
      <div className='flex flex-wrap flex-col gap-4 md:flex-row md:justify-between lg:justify-between md:gap-16'>
        {data.map((estate, index) => (
          <Card key={index} estate={estate} />
        ))}
      </div>
    </div>
  )
}

