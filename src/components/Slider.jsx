import React from 'react';



export default function Slider() {
  return (
    <>
    <div className='flex flex-col lg:flex-row gap-0 lg:gap-8 items-center justify-center'>
      <div className='relative'>
        <img className='w-80 md:w-[400px] lg:w-64 h-[450px] rounded-xl border-2 border-gray-300 shadow-xl object-cover' src='https://i.pinimg.com/564x/24/15/f4/2415f423c034d2b5197599afb0c71b71.jpg'/>
      <div className='lg:hidden block absolute bg-opacity-90 bg-base-100 top-1/3 w-full text-center text-xl py-6'>Welcome to <br/>
      <span className='font-bold text-2xl text-zinc-600 bg-transparent '>HavenInn</span></div>
      </div>
      <div>
        <img className='hidden lg:flex w-64 h-[450px] rounded-2xl border-2 border-gray-300 shadow-xl mt-12 object-cover' src='https://i.pinimg.com/564x/1e/dd/44/1edd44e2d265e2a92db3eb22e1862e66.jpg'/>
      </div>
       <div>
        <img className='hidden lg:flex w-64 h-[450px] rounded-xl border-2 border-gray-300 shadow-xl object-cover' src='https://i.pinimg.com/564x/31/17/b0/3117b0bbdfaee1b212e887b11a71a24c.jpg'/>
      </div>
      <div>
        <img className='hidden lg:flex w-64 h-[450px] rounded-2xl border-2 border-gray-300 shadow-xl mt-12 object-cover' src='https://i.pinimg.com/564x/80/8a/7e/808a7e3174e6e9be6ef210a143fcbb7e.jpg'/>
      </div>
    


    </div>


    </>
  );
}
