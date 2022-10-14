import React, { useState } from 'react';
import './Login.css';
import { AiOutlineMail } from 'react-icons/ai';
// import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { CgCloseO } from 'react-icons/cg';
// import { FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ open, onClose }) => {
  const navigate = useNavigate();
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
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('first_name', res.data.data.first_name);
        onClose(false);
        navigate('/');
      })
      .catch((err) => setMsg(err.response.data.message));
  };

  if (msg) {
    setTimeout(() => {
      setMsg('');
    }, 10000);
  }

  if (!open) return null;
  return (
    <div className="wrap_form">
      <span className={`error ${msg && 'muncul'}`}>{msg} !!</span>
      <div className="item_form">
        <h1> Log In to Your Account</h1>
        <CgCloseO onClick={() => onClose(false)} className="icon_close" />
      </div>
      <hr />
      <div>
        <form>
          <div className="input_box">
            <input type="email" name="email" onChange={handleDataInput} placeholder="Email Address" pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,}$" required />
            <AiOutlineMail className="icon_form" />
          </div>

          <div className="pass_box">
            <input type="password" placeholder="Password" onChange={handleDataInput} name="password" required />
            <FiEyeOff className="icon_form" />
          </div>
          <button type="submit" onClick={dataSend} className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
