import { useState, useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import { fetcher } from '../utils/api';
import { getIdFromLocalCookie, getTokenFromServerCookie, getTokenFromLocalCookie } from '../utils/auth';
import { useFetchUser } from '../utils/authContext';
import React from 'react';
import Header from '@/components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import Head from 'next/head';


const profile = ({ userData }) => {
  const { user, loading } = useFetchUser();
  

  // Profile Orders Details
  const [orderDetails, setOrderDetails] = useState([]);
  
  // Inside the `fetchOrderDetails` function
  const fetchOrderDetails = async () => {
    const userId = String(userData.id);
    const jwt = getTokenFromLocalCookie();
  
    try {
      const response = await fetcher(`http://127.0.0.1:1337/api/orders?user.id=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      setOrderDetails(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to fetch order details');
    }
  };
  


  useEffect(() => {
    if (user && !loading) {
      fetchOrderDetails();
    }
  }, [user, loading]);

  const [username, setUserName] = useState(userData.username || '');
  const [email, setEmail] = useState(userData.email || '');
  const [name, setName] = useState(userData.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');
  const [address, setAddress] = useState(userData.address || '');

  const handleSuccess = () => {
    toast.success('Profile Update Successfully!', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = getTokenFromLocalCookie(e.req);
    const data = { username, email, name, address, phoneNumber };
    const id = await getIdFromLocalCookie(e.req);

    try {
      const response = await fetcher(`http://127.0.0.1:1337/api/users/${id}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },

        body: JSON.stringify(data),
      });

      setName(response.name);
      setUserName(response.username);
      setEmail(response.email);
      setAddress(response.address);
      setPhoneNumber(response.phoneNumber);
      handleSuccess();

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <><Head>
      <title>Profile | ShopEase</title>
    </Head><Wrapper user={user}>
        <Header />
        <>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
          <h1 className="text-5xl pt-20 font-bold text-center">
            Welcome {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
              {user}
            </span>
            <span>👋</span>
          </h1>
          <div className="mt-5 sm:mt-6 flex">
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-5">
                  <h2 className="text-2xl font-semibold leading-6 text-gray-900 text-center ">Personal Information</h2>
                </div>
              </div>

              <div className="mt-20 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Your Name</label>
                          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                          <input type="text" name="username" id="username" value={username} onChange={(e) => setUserName(e.target.value)} autoComplete="username" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                          <input type="email" name="email" id="email" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                          <input type="text" name="phoneNumber" id="phoneNumber" value={phoneNumber} autoComplete="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>


                        <div className="col-span-6">
                          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                          <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="address" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>

                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 text-right sm:px-6">
                      <button type="submit" className="inline-flex justify-center rounded bg-pink-600 py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <h2 className="text-2xl font-semibold leading-6 text-gray-900 text-center pl-24 ">Order Details</h2>
            <div className="mt-10 ml-[-169px]">
              {orderDetails && orderDetails.length > 0 ? (
                <ul>
                  {orderDetails.map((order) => (
                    <li key={order.id}>
                      <div>
                        <p><b>Product Image:</b> <Image
                          src={order.attributes.products[0].attributes.thumbnail.data.attributes.url}
                          width={120}
                          height={120} /></p>
                        <br></br>
                        <p><b>Product Name:</b> {order.attributes.products[0].attributes.name}</p>
                        <p><b>Size:</b> {order.attributes.products[0].selectedSize}</p>
                        <p><b>Quantity:</b> {order.attributes.products[0].quantity}</p>
                        <p><b>Purchase Date:</b> {new Date(order.attributes.createdAt).toLocaleDateString()}</p>
                        <br></br>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No order details found.</p>
              )}
            </div>
          </div>
        </>
      </Wrapper></>
  );
};

export default profile;

export async function getServerSideProps({ req }) {
  const jwt = getTokenFromServerCookie(req);
  if (!jwt) {
    return {
      redirect: {
        destination: '/',
      },
    };
  } else {
    const responseData = await fetcher('http://127.0.0.1:1337/api/users/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return {
      props: {
        userData: responseData,
      },
    };
  }
}
