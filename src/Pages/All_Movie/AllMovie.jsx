import React, { useEffect, useState } from 'react';
import './AllMovie.css';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import image2 from './../Images/Header3.jpg';
import spiner from '../../assets/spin-loader.gif';
// import '../AllMovie/AllMovie.css'

const AllMovie = () => {
  const API_ALL = 'https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a';
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const [imageLoaded, setImageLoaded] = useState(true);
  //UseState
  //UseEffect
  //axios

  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(API_ALL)
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));
  }, []);
  //CEK TOKEN
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      <header className="listAll_img">
        <img src={image2} alt="Header List All" />
      </header>
      <div className="All_text">
        <h1>All Movies</h1>
      </div>
      <div className="Popular_item_wrap_all">
        {data ? (
          data.map((item) => {
            return (
              <Link key={item.id} className="Popular_menu_all" to={`/DetailPage/${item.id}`}>
                {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                <img className="poster_all" onLoad={handleImageLoaded} src={API_IMG + `${item.poster_path}`} alt="Movie Popular" />
                <div className="dec">
                  <h3>{item.title}</h3>
                  <h4>{item.release_date}</h4>
                </div>
              </Link>
            );
          })
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </div>
  );
};

export default AllMovie;
