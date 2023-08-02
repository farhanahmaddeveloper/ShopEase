import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { fetcher } from '../utils/api';
import { setToken } from '../utils/auth';
import { useUser } from '../utils/authContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
    const [data, setData] = useState({
        identifier: '',
        password: '',
      });
      const { user, loading } = useUser();
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const responseData = await fetcher(
            'http://localhost:1337/api/auth/local',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                identifier: data.identifier,
                password: data.password,
              }),
            }
            
          );
          setToken(responseData);
        } catch (error) {
            handleError();
        }
    
      };
    
      
    
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };

      const handleError = () => {
        toast.error("Incorrect username or password!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
  return (
    <div>
      <ToastContainer />
      
              <>
                

                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-80 max-w-md space-y-3 mt-9">
          <div>
            <img className="mx-auto w-16" src="/ShopEase register.png" alt="ShopEase"></img>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login into Your Account</h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true"></input>
            <div className="-space-y-px rounded-md shadow-sm">

              <div className='mb-5'>
                <label htmlFor="Username" className="sr-only">Username</label>
                <input type="text" name="identifier" onChange={handleChange} autoComplete="username" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-600 focus:outline-none focus:ring-pink-600 sm:text-sm" placeholder="Username"></input>
              </div>

              
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" name="password" onChange={handleChange} autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-600 focus:outline-none focus:ring-pink-600 sm:text-sm" placeholder="Password"></input>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-pink-600 group-hover:text-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Login
              </button>
            </div>
          </form>
          <p className="mt-10 text-center font-bold text-sm text-black">
            Don't Have an Account?
            <Link href="/register" className="font-semibold leading-6 text-pink-600">
              Sign Up
            </Link>
          </p>

        </div>
        </div>


              </>
            
    </div>
  )
}

export default LoginComponent
