
import React, { useState, useRef, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdMail, MdOutlinePhotoLibrary } from "react-icons/md";
import { AuthContext } from '../FirebaseProbider/FirbaseProvider'
import { useForm} from "react-hook-form"
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

export default function UpdateData() {
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();
    const { updateData, usern } = useContext(AuthContext);
    const {register, handleSubmit, reset,  formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        const { username, image} = data;
        updateData( username, image)
        .then(() => {
            console.log('User created successfully');
            Swal.fire({
                icon: 'success',
                title: 'User Data Updated',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');

            setTimeout(() => {
                window.location.reload();
              }, 2000);
            
            

        }).catch(error => {
                console.error('Error creating user:', error.message);
                setFormError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    };
  return (
    <div>
         <Helmet>
        <title>HavenInn - Update Data</title>
      </Helmet>
        <div className='flex flex-col items-center gap-8 py-16 px-2'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-96 mx-auto flex flex-col items-center gap-6 inter'>
                <label className="input input-bordered flex items-center gap-2 text-gray-600 w-full">
                    <FaRegUser />
                    <input type="text" className="grow" placeholder="Name" name='username'  defaultValue={usern.displayName}
                     {...register("username", { required: true })} />
                      {errors.username && <span className='text-xs text-red-500'>required field</span>}
                </label>
                <label className="input input-bordered flex items-center gap-2 text-gray-600 w-full">
                    <MdMail />
                    <input type="text" className="grow" placeholder="Email" name='username'  defaultValue={usern.email} readOnly/>
                </label>

                <label className="input input-bordered flex items-center gap-2 text-gray-600 w-full">
                    <MdOutlinePhotoLibrary />
                    <input type="text" className="grow" placeholder="Photo URL" name='photo'  defaultValue={usern.photoURL} 
                        {...register("image", { required: false })}/>
                </label>
                <button type='submit' className="btn w-full rounded-md text-white bg-indigo-700 font-bold">Update</button>
            </form>
            {formError && <p className='text-xs text-red-500'>{formError}</p>}

        
        </div> 
    </div>
  )
}
