import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [dataSearch, setDataSearch] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRes, setIsOpenRes] = useState(false);
  const [setIsOpenGlg] = useState(false);
  const credential = localStorage.getItem('credential');

  const navigate = useNavigate();

  const searchBtn = (name) => {
    navigate(`/Search/${name}`);
    setDataSearch('');
  };

  const variantsNav = {
    hidden: {
      opacity: 0,
      y: '-100vh',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      y: '-100vh',
    },
  };

  return (
    <div className="navbar_wrap m-0 p-0 w-full fixed overflow-hidden z-50">
      <motion.div 
        variants={variantsNav} 
        initial="hidden" 
        animate="visible" 
        exit="exit">
        <div className="navbar flex flex-row justify-between py-[0.3rem] px-[3rem] items-center bg-[#ffffff41]">
          <Link className="Navbar_Title no-underline FontAu TrnstionAll NavShdow hover:ShdowBlack text-[2em] text-[#b61818]" to="/">
            <motion.h1 initial={{ x: '-100vw' }} animate={{ x: 0 }} exit={{ x: '-100vw' }} transition={{ duration: 0.5, delay: 1 }}>
              MovieList
            </motion.h1>
          </Link>
          <div className="Navbar_search w-[30%] bg-[#ffffff00] rounded-full flex justify-center flex-wrap TrnstionAll BtnBorder hover:BxShdow">
            <form
              className="search_btn flex flex-row px-[1rem] h-[40px]"
              onSubmit={(e) => {
                e.preventDefault();
                searchBtn(dataSearch);
              }}
            >
              <input 
                className="cari bg-transparent border-none rounded-[0.4rem] w-[22rem] text-[0.9rem] focus:outline-none focus:border-none m-0 FontCb" 
                onChange={(e) => setDataSearch(e.target.value)} 
                value={dataSearch} 
                type="text" 
                placeholder="What do you want to watch?" />
              <button
                className='text-[1.3rem] bg-transparent border-none rounded-[0.5rem] cursor-pointer'
                type="submit">
                <BiSearchAlt className="navbar_icon text-[#b61818] bg-transparent" />
              </button>
            </form>
          </div>

          <motion.div 
            className="navbar_bottom flex flex-row"
            initial={{ x: '100vw' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100vw' }} 
            transition={{ duration: 0.5, delay: 1 }}>
            {credential ? (
              <>
                <span className="name FontCb ShadowText font-semibold uppercase flex items-center justify-center text-[#b61818]">
                  {localStorage.getItem('given_name')}
                </span>
                <img 
                  className="avatar w-[50px] h-[50px] rounded-full object-cover mx-[1rem]" 
                  src="https://fanbookcdn.fanbook.me/profile/2018/11/30/fde1d526a4a242a9943b48e76d4309b6_1543549001144.png" 
                  alt="avatar user" />
                <span
                  onClick={() => {
                    localStorage.clear();
                    navigate('/');
                  }}
                  className="name TrnstionAll FontCb ShadowText hover:AllShadow font-semibold uppercase flex items-center justify-center text-[#b61818] cursor-pointer"
                >
                  LOGOUT
                </span>
              </>
            ) : (
              <>
                <button 
                  className="login BtnBorder hover:BxShdow TrnstionAll FontCb h-[40x] text-[#b61818] hover:text-white px-[30px] font-semibold rounded-3xl mr-[20px] flex items-center cursor-pointer bg-transparent hover:bg-[#b61818]"
                  onClick={() => setIsOpen(true)}>
                  Login
                </button> 
                <GoogleOAuthProvider onClick={() => setIsOpenGlg(true)} />
                <button 
                  className="register BtnBorder hover:BxShdow TrnstionAll FontCb h-[40px] bg-[#b61818] hover:bg-[#b6181848] text-white font-semibold cursor-pointer px-[30px] rounded-3xl flex items-center"
                  onClick={() => setIsOpenRes(true)}>
                  Register
                </button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
      <Login open={isOpen} onClose={setIsOpen} />
      <Register openRes={isOpenRes} onCloseRes={setIsOpenRes} />
    </div>
  );
};

export default Navbar;
