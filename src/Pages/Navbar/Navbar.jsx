import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Navbar = () => {
  const [dataSearch, setDataSearch] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRes, setIsOpenRes] = useState(false);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const searchBtn = (name) => {
    if (name) {
      navigate(`/Search/${name}`);
    }
    setDataSearch('');
  };

  return (
    <div className="navbar_wrap">
      <div className="navbar">
        <Link className="Navbar_Title" to="/">
          <h1>MovieList</h1>
        </Link>
        <div className="Navbar_search">
          <div className="search_btn">
            <input onChange={(e) => setDataSearch(e.target.value)} value={dataSearch} className="cari" type="text" placeholder="What do you want to watch?" />
            <button type="submit">
              <BiSearchAlt onClick={() => searchBtn(dataSearch)} className="navbar_icon" />
            </button>
          </div>
        </div>
        <div className="navbar_bottom">
          {token ? (
            <>
              <span className="name">{localStorage.getItem('first_name')}</span>
              <img className="avatar" src="https://fanbookcdn.fanbook.me/profile/2018/11/30/fde1d526a4a242a9943b48e76d4309b6_1543549001144.png" alt="avatar user" />
              <span
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
                className="name"
              >
                LOGOUT
              </span>
            </>
          ) : (
            <>
              <button onClick={() => setIsOpen(true)} className="login">
                Login
              </button>
              <button onClick={() => setIsOpenRes(true)} className="register">
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <Login open={isOpen} onClose={setIsOpen} />
      <Register openRes={isOpenRes} onCloseRes={setIsOpenRes} />
    </div>
  );
};

export default Navbar;
