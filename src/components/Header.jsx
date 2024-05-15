import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../FirebaseProbider/FirbaseProvider'
import { FaBars } from 'react-icons/fa';
export default function () {
const { logOut, usern } = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true);
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }, 1000); 
}, [usern]);

const toggleMenu = () => {
  setIsOpen(!isOpen);
}

  return (
    <>
      <div className="navbar bg-transparent px-4 lg:px-0 py-6 flex flex-col lg:flex-row justify-between lexend lg:mb-6 mb-0 gap-4">
        <div className="md:navbar-start">
          <a href='/' className="text-sm md:text-xl  text-zinc-600 font-bold">HavenInn</a>
        </div>
        <button onClick={toggleMenu} className="lg:hidden">
          <FaBars />
        </button>
        <div className={`navbar-center ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="menu menu-horizontal px-1">
          
         
            <li><NavLink to='/' className={({ isActive }) => (isActive ? "link-active" : "link")}>Home</NavLink></li>
            <li><NavLink to='/rooms' className={({ isActive }) => (isActive ? "link-active" : "link")}>Rooms</NavLink></li>
            <li><NavLink to='/contact' className={({ isActive }) => (isActive ? "link-active" : "link")}>Contact</NavLink></li>
            <li><NavLink to='/about' className={({ isActive }) => (isActive ? "link-active" : "link")}>About</NavLink></li>
            {usern && <li><NavLink to='/mybookings' className={({ isActive }) => (isActive ? "link-active" : "link")}>My Bookings</NavLink></li>}


          </ul>
        </div>
        {usern ? (
 isLoading ? (
    <div>Loading user data...</div>
  ) : (
    <div className="navbar-end items-center lg:justify-end gap-4 lg:w-1/2 justify-between w-full">
      <ul className="menu menu-horizontal px-0 md:text-sm text-xs">
  <li className='px-0'>
    <NavLink to='/update' className={({ isActive }) => (isActive ? "pr-0 link-active" : "pr-0 link")}>
      Update Profile
    </NavLink>
  </li>
</ul>
      <div className="avatar rounded-md border-2">
        <NavLink to='/user' className="w-8 h-8 rounded-md">
          <img className='w-8 h-8 object-fit rounded-md' src={usern.photoURL} alt="user" title={usern.displayName} />
        </NavLink>
      </div>
      <NavLink to='' onClick={logOut} className="ml-2 text-sm md:text-base px-4 py-2 font-bold btn-ghost text-cyan-600 rounded-md">Log Out</NavLink>
    </div>
  )
) : (
  <div className="navbar-end justify-center lg:justify-end">
    <NavLink to='/login' className="text-sm md:text-base p-2 font-bold btn-ghost text-cyan-600 rounded-md ">Log In</NavLink>
  </div>
)}


      </div>

    </>
  )
}
