import React, { useState } from 'react';
import './Register.css';
import { CgCloseO } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
// import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Register = ({ openRes, onCloseRes }) => {
  const API_ENDPOINT = `https://notflixtv.herokuapp.com/api/v1/users`;
  const [preview, setDatapreview] = useState(null);
  const [image, setDataImage] = useState(null);
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
  return (
    <div className={`wrap_form_Res`}>
      <span className={`error ${msg && 'muncul'}`}>{msg} !!</span>
      <div className="item_form_Res">
        <h1> Create Account</h1>
        <CgCloseO onClick={() => onCloseRes(false)} className="icon_close" />
      </div>
      <hr />
      <div className="wrapper_form">
        <form>
          <div className="input_img">
            {preview ? <img src={preview} alt="prevew " className="preview_Img" /> : <BiUserCircle className="iconUser" />}
            <input
              type="file"
              id="file"
              onChange={(e) => {
                setDataImage(e.target.files[0]);
                setDatapreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label htmlFor="file">
              <BsFillCameraFill className="iconCamera" />
            </label>
          </div>

          <div className="input_box">
            <input onChange={handleDataInput} name="first_name" type="text" placeholder="First Name" required />
            <FaRegUser className="icon_form" />
          </div>
          <div className="input_box">
            <input onChange={handleDataInput} type="text" placeholder="Last Name" name="last_name" required />
            <FaRegUser className="icon_form" />
          </div>
          <div className="input_box">
            <input onChange={handleDataInput} type="email" placeholder="Email Address" name="email" required />
            <AiOutlineMail className="icon_form" />
          </div>

          <div className="input_box">
            <input onChange={handleDataInput} type="password" placeholder="Password" name="password" required />
            <FiEyeOff className="icon_form" />
          </div>
          <div className="input_box">
            <input onChange={handleDataInput} type="password" placeholder="Password Confirmation" name="password_confirmation" required />
            <FiEyeOff className="icon_form" />
          </div>

          <button type="submit" onClick={dataSend} className="button">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
