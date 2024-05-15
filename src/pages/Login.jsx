import React, { useState, useContext, useEffect } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaGoogle} from "react-icons/fa";
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { AuthContext } from '../FirebaseProbider/FirbaseProvider'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
    //google sign up
    const { googleLogin, usern} = useContext(AuthContext);
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (usern) {
            navigate('/');
        }
    }, [usern, navigate]);
    const [formerror, setFormerror] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, pass } = data; 

    const from = location.state || '/';

        const signIn = async (email, pass) => {
            try {
                const result = await signInUser(email, pass);
                return result;
                
            } catch (error) {
                console.error('Error in signIn:', error);
                throw error; 
            }
        };
        signIn(email, pass).then(() => {
            console.log('Login successful');
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1500
                });   
                
                navigate(from, {replace:true});
                reset(); 
        }).catch((error) => {
            console.error('Error during login:', error.message);
                setFormerror(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password.',
                });
        });
    };

    if(usern) return
    return (
        <div className='flex flex-col items-center gap-8 py-16 px-2'>
         <Helmet>
        <title>HavenInn - Login</title>
      </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-96 mx-auto flex flex-col gap-6  inter'>
                <label className="input input-bordered flex items-center gap-2 text-gray-600">
                    <AiOutlineMail />
                    <input type="text" className="grow" placeholder="Email" name='email'
                        {...register("email", { required: true })} />
                    {errors.pass && <span className='text-xs text-red-500'>required field</span>}
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    {showPassword ? <IoEyeOutline onClick={() => setShowPassword(false)} /> : <IoEyeOffOutline onClick={() => setShowPassword(true)} />}
                    <input type={showPassword ? "text" : "password"} className="grow" name='pass' placeholder='password'
                        {...register("pass", { required: true })} />
                    {errors.pass && <span className='text-xs text-red-500'>required field</span>}
                </label>
                <button type='submit' className="btn rounded-md text-white bg-indigo-700 font-bold">Log In</button>
{/* 
                {formerror && <p className='text-red-800'> {formerror}</p>} */}
            </form>
            <div className='flex flex-col md:flex-row mx-auto gap-4'>
                <button className="btn rounded-md bg-red-300  flex items-center gap-2" onClick={() => googleLogin()}>
                    <FaGoogle className='bg-transparent'/> Log In with Google
                </button>
            </div>
            <div>If you have already registered, please login.</div>
            <div>New to join? <Link to={'/signup'} className='text-indigo-700'>Register</Link></div>
        </div>
    )
}
