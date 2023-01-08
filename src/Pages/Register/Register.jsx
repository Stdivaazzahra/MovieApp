import React, { useState } from 'react';
import './Register.css';
import { CgCloseO } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import axios from 'axios';

const Register = ({ openRes, onCloseRes }) => {
  const API_ENDPOINT = `https://notflixtv.herokuapp.com/api/v1/users`;
  const [preview, setDatapreview] = useState(null);
  const [image, setDataImage] = useState(null);
  const [showIconRes1, setShowIconRes1] = useState(false)
  const [showIconRes2, setShowIconRes2] = useState(false)
  const [msg, setMsg] = useState('');
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  if (!openRes) return null;
  const handleDataInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log(image);
  const dataSend = (e) => {
    e.preventDefault();
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      image: image,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    axios
      .post(API_ENDPOINT, user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (msg) {
    setTimeout(() => {
      setMsg('');
    }, 10000);
  }

  const handleShowIcon1 = () => {
    setShowIconRes1(!showIconRes1)
  }
  const handleShowIcon2 = () => {
    setShowIconRes2(!showIconRes2)
  }
  return (
    <div className="wrap_form_Res w-[35%] FontCb p-[2rem] bg-[#e9e8e8] flex flex-col justify-center items-center m-0 fixed top-[50%] left-[50%] z-50 rounded-xl ">
      <span className={`error ${msg && 'muncul'}`}>{msg} !!</span>
      <div className="item_form_Res w-[90%] flex flex-row flex-wrap justify-between">
        <h1 className='text-[1.2rem] pb-[1rem] FontCb'> 
          Create Account
        </h1>
        <CgCloseO onClick={() => onCloseRes(false)} className="icon_close text-[1.5rem] cursor-pointer hover:text-[#b50e0e]" />
      </div>
      <hr className='BorderHr flex flex-wrap w-full mb-[0.3rem]'/>
      <div className="wrapper_form w-full">
        <form className='m-0 w-full flex flex-col justify-between'>
          <div className="input_img flex flex-col items-center">
            {preview ? 
              <img src={preview} alt="prevew" className="preview_Img w-[93.34px] h-[93.34px] object-cover rounded-[50%]" /> 
              : 
              <BiUserCircle className="iconUser w-[7rem] h-[7rem]" />}
            <input
              className='absolute top-[10%] left-[50%] z-50 opacity-0 cursor-pointer scale-0'
              type="file"
              id="file"
              onChange={(e) => {
                setDataImage(e.target.files[0]);
                setDatapreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label htmlFor="file">
              <BsFillCameraFill className="iconCamera text-[2rem] absolute text-[#c51212] top-[27%] left-[53%] cursor-pointer" />
            </label>
          </div>

          <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
            <input 
                className='w-full border-none focus:outline-none'
                onChange={handleDataInput} 
                name="first_name" 
                type="text" 
                placeholder="First Name" required />
            <FaRegUser className="icon_form" />
          </div>
          <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
            <input
                className='w-full border-none focus:outline-none'
                onChange={handleDataInput} 
                type="text" 
                placeholder="Last Name" 
                name="last_name" required />
            <FaRegUser className="icon_form" />
          </div>
          <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
            <input 
                className='w-full border-none focus:outline-none'
                onChange={handleDataInput} 
                type="email" 
                placeholder="Email Address" 
                name="email" required />
            <AiOutlineMail className="icon_form" />
          </div>
          <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
            <input 
                className='w-full border-none focus:outline-none'
                onChange={handleDataInput} 
                type={(showIconRes1 === false) ? 'password':'text'}
                placeholder="Password" 
                name="password" required />
            {
              (showIconRes1 === false) ?
                <FiEyeOff 
                  className="text-[1.3rem] cursor-pointer"
                  onClick={handleShowIcon1} /> :
                <FiEye 
                  className="text-[1.3rem] cursor-pointer"
                  onClick={handleShowIcon1} />
            }
          </div>
          <div className="input_box InBrder hover:BtnBorder TrnstionAll flex items-center w-full h-[2.5rem] px-[1rem] my-[0.6rem] text-[1rem] bg-white rounded-3xl">
            <input 
                className='w-full border-none focus:outline-none'
                onChange={handleDataInput} 
                type={(showIconRes2 === false) ? 'password':'text'}
                placeholder="Password Confirmation" 
                name="password_confirmation" required />
            {
              (showIconRes2 === false) ?
                <FiEyeOff 
                  className="text-[1.3rem] cursor-pointer"
                  onClick={handleShowIcon2} /> :
                <FiEye 
                  className="text-[1.3rem] cursor-pointer"
                  onClick={handleShowIcon2} />
            }
          </div>

          <button 
            className="button FontCb BtnBorder TrnstionAll hover:BxShdow text-[1rem] my-[0.5rem] w-full self-start h-[2.5rem] rounded-3xl px-[1rem] bg-[#b61818eb] text-white cursor-pointer hover:text-[#b61818eb] hover:bg-transparent font-semibold"
            type="submit" 
            onClick={dataSend}> 
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
