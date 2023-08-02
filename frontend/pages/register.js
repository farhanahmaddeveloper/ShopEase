import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from '../utils/authContext';
import Wrapper from '../components/Wrapper';
import RegisterComponent from '../components/RegisterComponent';
import Header from '@/components/Header';
import Head from 'next/head';

const register = () => {
  const { user, loading } = useFetchUser();
  const router = useRouter();

  // Check if user exists and redirect to profile page
    useEffect(() => {
    if (!loading && user) {
      router.push('/profile'); // Redirect the user to profile page
    }
  }, [loading, user, router]);

  return (
    <><Head>
      <title>Register | ShopEase</title>
      </Head>
      <Wrapper>
      <Header />
      <RegisterComponent />
    </Wrapper></>
  );
};

export default register;
