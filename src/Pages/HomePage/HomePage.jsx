import React, { useEffect, useState } from 'react';
import './HomePage.css';
import image from './../Images/Header1.jpg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TiArrowRightOutline } from 'react-icons/ti';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import spiner from '../../assets/spin-loader.gif';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import { motion } from 'framer-motion';

const HomePage = () => {
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const API_POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`;
  const API_Cate = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US';
  const [imageLoaded, setImageLoaded] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [cate, setCate] = useState();

  useEffect(() => {
    axios
      .get(API_POPULAR)
      .then((res) => {
        setData(res.data.results.slice(0, 15));
      })
      .catch((err) => console.log(err));
  }, [API_POPULAR]);

  useEffect(() => {
    axios
      .get(API_Cate)
      .then((res) => {
        setCate(res.data.genres);
      })
      .catch((err) => console.log(err));
  }, [API_Cate]);

  const getID = (id) => {
    navigate(`/DetailPage/${id}`);
  };

  const getGendres = (genres) => {
    navigate(`/Categories/${genres}`);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };
  return (
    <>
      <div className="HomePage w-full h-screen">
        <div className="HomaPage_img -z-0">
          <img
            className='relative flex justify-center w-full h-screen object-cover -z-10'
            src={image} 
            alt="Img HomePage"/>
        </div>
        <div className="HomePage_Text z-10 pl-[3rem] text-white FontCb ShdowBlack">
          <motion.h1 
            className="text-red-600 font-bold text-[70px] absolute w-[47%] top-[24%]"
            initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            Doctor Strange in the Multiverse of Madness
          </motion.h1>
          <motion.p 
            className='absolute w-[47%] top-[65%]'
            initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 0.59 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dolore quos ipsa dicta natus quaerat odit cumque accusamus ducimus temporibus!
          </motion.p>
          <motion.div 
            className="yt TrnstionAll flex items-center flex-row absolute text-[13px] font-bold px-[1.5rem] py-[0.5rem] top-[75%] bg-[#ff0000] rounded-3xl cursor-pointer hover:BxShdow"
            initial={{ y: '100vh', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.53 }}>
            <AiOutlinePlayCircle className="icon_play_home text-[1.5rem]" />
            <a 
              href="https://youtu.be/Rt_UqUm38BI" 
              target="blank" 
              className='text-white pl-[1rem] no-underline'>
              WATCH TRAILER
            </a>
          </motion.div>
        </div>
      </div>

      <div className="popular_wrap w-full">
        <div className="popular_text text-[1.7rem]  p-[3rem] flex justify-between no-underline">
          <h1 className="text-[1.3em] ShadowText font-semibold FontCb">
            Popular Movie
          </h1>
          <Link 
            to="/AllMovie" 
            className="All_Movie flex items-center justify-items-center no-underline">
            <h2 className="ShadowText text-[0.9em] font-medium flex items-center text-red-600 justify-items-center hover:AllShadow TrnstionAll no-underline FontCb">
              See All Movie
                <TiArrowRightOutline className="Arrow_icon text-[1.7rem] ml-[0.5rem]"/>
            </h2>
          </Link>
        </div>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <div className="Popular_item flex flex-row flex-wrap justify-center gap-[1rem]">
          {data &&
            data.map((item) => {
              return (
                <SwiperSlide>
                  <div 
                      className="Popular_menu BrderMenu hover:BxMenu TrnstionAll flex justify-center flex-col relative rounded-xl text-black bg-[#eee] overflow-hidden h-[27rem] w-[28rem] cursor-pointer"
                      key={item.id} 
                      onClick={() => getID(item.id)}>
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
                  </div>
                </SwiperSlide>
              );
            })}
        </div>
      </Swiper>

      <div className="popular_wrap w-full">
        <div className="popular_text text-[1.7rem]  p-[3rem] flex justify-between no-underline">
          <h1 className="text-[1.3em] ShadowText font-semibold FontCb">
            Browse by Genres
          </h1>
          <Link 
            to="/AllMovie" 
            className="All_Movie flex items-center justify-items-center no-underline">
            <h2 className="ShadowText text-[0.9em] font-medium flex items-center text-red-600 justify-items-center hover:AllShadow TrnstionAll no-underline FontCb">
              See All Movie
              <TiArrowRightOutline className="Arrow_icon text-[1.7rem] ml-[0.5rem]"/>
            </h2>
          </Link>
        </div>

        <div className="CateBtn_Wrap m-0 p-0 flex justify-between">
          <div className="cate_btn w-full flex flex-wrap gap-[1rem]">
            {cate &&
              cate.map((e) => (
                <button 
                  key={e.id} 
                  onClick={() => getGendres(e.name.toLowerCase())}
                  className="BtnBorder TrnstionAll w-[8.3rem] text-[0.9rem] py-[0.5rem] px-[1rem] rounded-3xl cursor-pointer hover:text-white hover:bg-[#b61818] hover:BxShdow">
                  {e.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <div className="Popular_item flex flex-row flex-wrap justify-center gap-[1rem]">
          {data ? (
            data.map((item) => {
              return (
                <SwiperSlide>
                  <div 
                    className="Popular_menu BrderMenu hover:BxMenu TrnstionAll flex justify-center flex-col relative rounded-xl text-black bg-[#eee] overflow-hidden h-[27rem] w-[28rem] FontCb cursor-pointer"
                    key={item.id} 
                    onClick={() => getID(item.id)}>
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
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <h2>Loading</h2>
          )}
        </div>
      </Swiper>
    </>
  );
};

export default HomePage;
