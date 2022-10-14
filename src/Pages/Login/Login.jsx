import React, { useState } from 'react';
import './Login.css';
import { AiOutlineMail } from 'react-icons/ai';
import { FiEye } from 'react-icons/fi';
import { CgCloseO } from 'react-icons/cg';
// import { FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ open, onClose }) => {
  const API_LOGIN = `https://notflixtv.herokuapp.com/api/v1/users/login`;
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [user, setUser] = useState({});
  const navi = useNavigate();

  if (!open) return null;

  const handleDataInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const dataSend = (e) => {
    e.preventDefault();
    axios
      .post(API_LOGIN, data)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('first_name', res.data.data.first_name);
        navi('/');
        onClose(false);
      })
      .catch((err) => console.log(err));
  };

  console.log(data);

  return (
    <div className="wrap_form">
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
            <FiEye className="icon_form" />
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
