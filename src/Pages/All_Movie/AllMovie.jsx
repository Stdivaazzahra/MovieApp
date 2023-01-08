import React, { useEffect, useState } from 'react';
import './AllMovie.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import image2 from './../Images/Header3.jpg';
import spiner from '../../assets/spin-loader.gif';
import { motion } from 'framer-motion';
const AllMovie = () => {
  const API_ALL = 'https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a';
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const [imageLoaded, setImageLoaded] = useState(true);

  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(API_ALL)
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      <header className="listAll_img">
        <img 
            className='flex justify-center w-full h-[35vh] relative object-cover'
            src={image2} 
            alt="Header List All" />
      </header>
      <div className="All_text AllMovShdow FontCb w-full flex justify-center pt-[65px] pb-[40px] text-[4rem] text-white absolute top-[10%] z-10">
        <h1>All Movies</h1>
      </div>
      <div className="Popular_item_wrap_all flex flex-row flex-wrap justify-center gap-[1rem] py-[4rem] px-[2.5rem]">
        {data ? (
          data.map((item, i) => {
            return (
              <motion.div initial={{ x: i % 2 === 0 ? '-100vw' : '100vw' }} animate={{ x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} exit={{ x: i % 2 === 0 ? '-100vw' : '100vw' }}>
                <Link 
                      className="Popular_menu_all BrderMenu hover:BxMenu TrnstionAll no-underline flex justify-center items-center flex-col relative rounded-xl text-black bg-white overflow-hidden h-[24rem] w-[15rem] cursor-pointer" 
                      key={item.id} 
                      to={`/DetailPage/${item.id}`}>
                      {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                      <img 
                          className="poster absolute flex w-full left-0 top-0 right-0 bottom-0 h-full object-cover" 
                          onLoad={handleImageLoaded} 
                          src={API_IMG + `${item.poster_path}`} 
                          alt="Movie Popular" />
                      <div className="dec Trnsition2 absolute left-0 right-0 top-0 bottom-0 z-10 h-full w-full text-white flex flex-col justify-end">
                        <h3 className='text-[15px] text-center'>
                          {item.title}
                        </h3>
                        <h4 className='text-[12px] text-center mb-[2em]'>
                          {item.release_date}
                        </h4>
                      </div>
                </Link>
              </motion.div>
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
