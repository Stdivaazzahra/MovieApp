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
    <div 
        key={item.id} 
        onClick={() => getID(item.id)} 
        className="Popular_menu BrderMenu hover:BxMenu TrnstionAll flex justify-center flex-col relative rounded-xl text-black bg-[#eee] overflow-hidden h-[27rem] w-[28rem] FontCb cursor-pointer">
      {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
      <img 
          className={imageLoaded ? 
            'poster absolute flex w-full left-0 top-0 right-0 bottom-0 h-full object-cover' 
            : 
            'ended hidden '} 
          onLoad={handleImageLoaded} 
          src={API_IMG + `${item.poster_path}`} 
          alt="Movie Category" />
      <div className="dec Trnsition2 absolute left-0 right-0 top-0 bottom-0 z-10 h-full w-full text-white flex flex-col justify-end">
        <h3 className='text-[15px] text-center'>
          {item.title}
        </h3>
        <h4 className='text-[12px] text-center mb-[2em]'>
          {item.release_date}
        </h4>
      </div>
    </div>
  );
};

export default CardList;
