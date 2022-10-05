import React, { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dataSearch, setDataSearch] =useState()
  
    const navigate =  useNavigate()
    const searchBtn = (name) =>{
      if(name){
        navigate(`/Search/${name}`)
      }
      setDataSearch('')
    }


  return (
    <div className='navbar_wrap'>
      <div className="navbar">
          <Link className='Navbar_Title' to='/'>
            <h1>MovieList</h1>
          </Link>
          <div className='Navbar_search'>
            <div className='search_btn'>
            <input onChange={(e)=> setDataSearch(e.target.value)} value={dataSearch} className='cari' type="text" placeholder='What do you want to watch?' />
            <button type='submit'><BiSearchAlt onClick={()=> searchBtn(dataSearch)} className='navbar_icon'/></button>
            </div>
          </div>
          <div className="navbar_bottom">  
            <div className='login'>
              Login
            </div>
            <div className='register'>
              Register
          </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar