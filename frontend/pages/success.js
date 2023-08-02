import React from "react";
import Wrapper from "@/components/Wrapper";
import Link from "next/link";
import Header from "@/components/Header";
import { useFetchUser } from '../utils/authContext';

const Success = () => {
    const { user } = useFetchUser();
    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper user={user}>
                <Header/>
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold">
                        Thanks for shopping with us!
                    </div>
                    <div className="text-lg font-bold mt-2">
                        Your order has been placed successfully.
                    </div>
                    <div className="text-base mt-5">
                        An invoice is sent to your email. Check your Email.
                    </div>
                    <Link href="/shop" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
                </div>
            </Wrapper>
        </div>
    );
};

export default Success;
