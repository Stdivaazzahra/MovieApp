import React, { useState } from 'react';
import spiner from '../../../assets/spin-loader.gif';
import '../Categories.css';
import '../../HomePage/HomePage.css';
const API_IMG = 'https://image.tmdb.org/t/p/w500/';

const CardList = ({ item, getID }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };
  console.log(imageLoaded);
  return (
    <div onClick={() => getID(item.id)} key={item.id} className="Popular_menu">
      {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
      <img className={imageLoaded ? 'poster' : 'ended'} onLoad={handleImageLoaded} src={API_IMG + `${item.poster_path}`} alt="Movie Category" />
      <div className="dec">
        <h3>{item.title}</h3>
        <h4>{item.release_date}</h4>
      </div>
    </div>
  );
};

export default CardList;
