import React from "react";
import { UserProvider } from '../utils/authContext';
const Wrapper = ({ user, loading = false, children, className }) => {
        
    return (
        <UserProvider value={{ user, loading }}>

            <div
                className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto ${className || ""}`}
            >
                {children}
            </div>
        </UserProvider>
        
    );
};

export default Wrapper;
