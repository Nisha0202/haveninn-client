import React from 'react'
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom'
export default function CardDetails() {

    const estates = useLoaderData();
    const { id } = useParams();
    const estate = estates.find(estate => estate.id === id);
    console.log(estate);
    if (!estate) {

        return <div>No estate found with id {id}</div>;
    }


    return (
        <div className='py-6 border-2 rounded-md px-2 lg:px-6 mb-3'>
            <div className='flex flex-col lg:flex-row gap-4 md:gap-8 h-full'>
                {/* details */}
                <div className='w-full'>
                    <div className="flex flex-col w-full gap-2">
                        <div className='flex flex-col gap-4 intent'>
                            <p className='text-gray-600 text-base border-b-2 py-2'>{estate.description}</p>
                            <p className=' font-normal lg:text-sm/8 text-xs/9'><span className='font-bold lexend lg:text-sm/8 text-xs'>Price:</span> {estate.price}£</p>

                            <table className='max-w-60 text-xs h-20'>
                                <tbody className='text-left'>
                                    <tr >
                                        <td>Status:</td>
                                        <th>{estate.status}</th>
                                    </tr>
                                    <tr>
                                        <td>Area:</td>
                                        <th>{estate.roomsize}</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className=" flex flex-row gap-4">
                    
                                {estate.roomImages.map((imageUrl, index) => (
                                    <img key={index} src={imageUrl} alt="" className=" w-80 h-80 bg-transparent border-2 rounded-xl" />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className='lg:w-2/3 w-full lg:h-[580px] h-80 md:w-72 mx-auto lg:mx-0 rounded-2xl' >
                    <img src={estate.image} alt="" className='w-full h-full rounded-xl border-[2px] border-base-400 object-fill' />
                </div>

            </div>
        </div>
    )
}

