import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../HomePage/HomePage.css';
import spiner from '../../assets/spin-loader.gif';
import { motion } from 'framer-motion';

const Search = () => {
  const { name } = useParams();
  const API_Search = 'https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query=' + name;
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';

  const [imageLoaded, setImageLoaded] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(API_Search)
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));
  }, [API_Search]);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div className="Search_wrap w-full pt-[5rem]">
      <h1 className="text-[2.1em] font-semibold FontCb ShadowText pl-[3rem] pb-[2rem] pr-[2rem]">
        Search Result "{name}"
      </h1>
      <div className="search_item_wrap flex flex-row flex-wrap justify-center gap-[1rem] m-0">
        {data ? (
          data.map((item, i) => {
            return (
              <motion.div 
                  initial={{ x: i % 2 === 0 ? '-100vw' : '100vw' }} 
                  animate={{ x: 0 }} 
                  transition={{ duration: 0.3, delay: i * 0.05 }} 
                  exit={{ x: i % 2 === 0 ? '-100vw' : '100vw' }}>
                <Link key={item.id} 
                  className="Popular_menu_all BrderMenu hover:BxMenu TrnstionAll no-underline flex justify-center items-center flex-col relative rounded-xl text-black bg-white overflow-hidden h-[24rem] w-[15rem] cursor-pointer" 
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

export default Search;
