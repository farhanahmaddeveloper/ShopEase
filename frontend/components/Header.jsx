import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { BsCart} from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

//For User
import { unsetToken } from '../utils/auth';
import { useUser } from '../utils/authContext';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {
    
const { user, loading } = useUser();

      
    
      const logout = () => {
        unsetToken();
        
        window.location.href = '/login';

      };
    

    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState(null);

    const { cartItems } = useSelector((state) => state.cart);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
            } else {
                setShow("shadow-sm");
            }
        } else {
            setShow("translate-y-0");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await fetchDataFromApi("/api/categories?populate=*");
        setCategories(data);
    };

    return (

        
        <header
            className={`fixed top-0 pr-24 w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 transition-transform duration-300 ${show}`}
        >
            <Wrapper className="h-[60px] flex justify-between items-center">
                <Link href="/">
                    <img src="/ShopEase.png" className="w-[70px] md:w-[110px]" />
                </Link>

                <Menu
                    showCatMenu={showCatMenu}
                    setShowCatMenu={setShowCatMenu}
                    categories={categories}
                />

                {mobileMenu && (
                    <MenuMobile
                        showCatMenu={showCatMenu}
                        setShowCatMenu={setShowCatMenu}
                        setMobileMenu={setMobileMenu}
                        categories={categories}
                    />
                )}

        <div className="flex items-center gap-2 text-black">
          {!loading && !user ? (
             
      
          <Link href= "/login"><button
            className="md:p-2 rounded py-2 text-white bg-pink-600 p-2"
            type="submit" >
            Login
              </button>
              </Link>
             
          ) : (
         ''
           )}
                
                
             {/* User Start */}
             {!loading &&
              (user ? (

                
                  <Link href="/profile" className="md:p-2 py-2 block hover:text-purple-400">
                    
                      Profile
                    
                  </Link>
                
              
              ) : (
                ''
              ))}
               {!loading &&
              (user ? (

                <button>
                  <a
                    className="md:p-2 py-2 rounded bg-pink-600 text-white"
                    onClick={logout}
                    style={{ cursor: 'pointer' }}
                  >
                    Logout
                  </a>
                </button>

              ) : (
                ''
              ))}
            
            {/* User End    */}


                    {/* Icon start */}
                    <Link href="/cart">
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <BsCart className="text-[15px] md:text-[20px]" />
                            {cartItems.length > 0 && (
                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {cartItems.length}
                                </div>
                            )}
                        </div>
                    </Link>
                    {/* Icon end */}

                    
                    



                    {/* Mobile icon start */}
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                        {mobileMenu ? (
                            <VscChromeClose
                                className="text-[16px]"
                                onClick={() => setMobileMenu(false)}
                            />
                        ) : (
                            <BiMenuAltRight
                                className="text-[20px]"
                                onClick={() => setMobileMenu(true)}
                            />
                        )}
                    </div>
                    {/* Mobile icon end */}
                </div>
                 
            </Wrapper>
        </header>
    );
};

export default Header;









