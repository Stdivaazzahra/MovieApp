import React, { useState } from 'react';
import './Login.css';
import { AiOutlineMail } from 'react-icons/ai';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { CgCloseO } from 'react-icons/cg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Login = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false)
  const API_ENDPOINT = `https://notflixtv.herokuapp.com/api/v1/users/login`;
  const [msg, setMsg] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleDataInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const dataSend = (e) => {
    e.preventDefault();
    axios
      .post(API_ENDPOINT, data)
      .then((res) => {
        localStorage.setItem('credential', res.data.data.token);
        localStorage.setItem('given_name', res.data.data.first_name);
        onClose(false);
        navigate('/');
      })
      .catch((err) => setMsg('Email atau Password anda salah!'));
  };

  if (msg) {
    setTimeout(() => {
      setMsg('');
    }, 10000);
  }

  const handleShowIcon = () => {
    setShowIcon(!showIcon)
  }

  if (!open) return null;
  return (
    <div className="wrap_form w-[30%] FontCb bg-[#e9e8e8] flex flex-col justify-center items-center m-0 fixed top-[50%] p-[2rem] left-[50%] z-50 rounded-xl ">
      <span className={`error ${msg && 'muncul'}`}>{msg} !!</span>
      <div className="item_form w-[90%] flex flex-row flex-wrap justify-between">
        <h1 className='text-[1.2rem] pb-[1rem]'> 
          Log In to Your Account
        </h1>
        <CgCloseO onClick={() => onClose(false)} className="icon_close text-[1.5rem] cursor-pointer hover:text-[#b50e0e]" />
      </div>
      <hr className='BorderHr flex flex-wrap w-full mb-[0.3rem]'/>
      <form className='m-0 w-full flex flex-col justify-between'>
        <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
          <input 
              className='w-full border-none focus:outline-none' 
              type="email" 
              name="email" 
              onChange={handleDataInput} 
              placeholder="Email Address" 
              pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,}$" required />
          <AiOutlineMail className="icon_form left-[23rem] top-[1.2rem] text-[1.3rem]" />
        </div>

        <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
          <input 
              className='w-full border-none focus:outline-none'
              type={(showIcon === false) ? 'password':'text'}
              placeholder="Password" 
              onChange={handleDataInput} 
              name="password" required />
          {
            (showIcon === false) ?
              <FiEyeOff 
                className="text-[1.3rem] cursor-pointer"
                onClick={handleShowIcon} /> :
              <FiEye 
                className="text-[1.3rem] cursor-pointer"
                onClick={handleShowIcon} />
          }
        </div>

        <div className="googleBtn flex flex-col justify-center items-center mb-[1rem]">
          <button 
            className="button FontCb BtnBorder TrnstionAll hover:BxShdow text-[1rem] my-[0.5rem] w-full self-start h-[2.5rem] rounded-3xl px-[1rem] bg-[#b61818eb] text-white cursor-pointer hover:text-[#b61818eb] hover:bg-transparent font-semibold"
            type="submit" 
            onClick={dataSend}>
            Login
          </button>

          <article className='flex items-center text-[1rem]'>
            or
          </article>

          <GoogleOAuthProvider clientId="1054221434578-4obkp9s6tn17m7hhlg65eqm61jpv3ooe.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
                localStorage.setItem('credential', credentialResponse.credential);
                localStorage.setItem('given_name', decoded.given_name);
                localStorage.getItem('picture', decoded.picture);
                onClose(false);
                navigate('/');
              }}
              onError={() => {
                setMsg('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
};

export default Login;
