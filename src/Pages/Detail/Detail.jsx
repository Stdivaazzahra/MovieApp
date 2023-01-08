import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import { BiStar } from 'react-icons/bi';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import spiner from '../../assets/spin-loader.gif';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';


const Detail = () => {
  const [data, setData] = useState();
  const [cast, setCast] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { id } = useParams();

  const API_Detail = `https://api.themoviedb.org/3/movie/${id}?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US`;
  // const API_Cast = "https://api.themoviedb.org/3/search/movie/popular/credits?api_key=9cc1bc46ae7070abb9a43667213d613a"
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';

  const API_Cast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9cc1bc46ae7070abb9a43667213d613a`;

  console.log(id);

 
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    axios
      .get(API_Detail)
      .then((ress) => setData(ress.data))
      .catch((err) => console.log(err));
  }, [setData, API_Detail]);
  console.log(data);

  useEffect(() => {
    axios
      .get(API_Cast)
      .then((ress) => setCast(ress.data.cast.slice(0, 10)))
      .catch((err) => console.log(err));
  }, [API_Cast]);
  return (
    <>
      {data && (
        <motion.div className="detail_wrap w-full h-full" 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            layoutId={data?.id}>

          <div className="background_Detail h-screen">
            <div className="detail_item w-full h-full relative flex items-center">
              <img
                  className='flex justify-center flex-wrap absolute object-cover w-full h-full z-10'
                  src={API_IMG + `${data?.backdrop_path}`} 
                  alt="Background_Detail" />
              <motion.div 
                  className="detail_text ShdowBlack text-white pl-[3rem] w-full z-20 pt-[3rem] pb-[1rem]"
                  initial={{ x: '-100vw', opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  transition={{ delay: 0.3, duration: 0.5 }}>
                <h1 className='text-[5rem] pb-[1rem] w-[80%]'>
                  {data?.title}
                </h1>
                <h3
                  className='text-[1.2rem] pb-[3rem] flex flex-row'
                  key={data?.id}>
                  {data?.genres.map((e) => {
                    return (
                      <span key={e.id} className="genre block mr-[0.5rem]">
                        {e.name}
                      </span>
                    );
                  })}
                </h3>
                <p className='text-[1.3rem] pb-[3rem] w-[60%]'>
                  {data?.overview}
                </p>
                <h3 className='text-[1.2rem] pb-[3rem] flex flex-row items-center'>
                  {' '}
                  <span className="start_icon text-[#ff1100] pr-[0.3rem] text-[1.5rem]">
                    {' '}
                    <BiStar />{' '}
                  </span>
                  {data?.vote_average.toFixed(1)}
                </h3>
                <div>
                  <a 
                      href={`https://www.youtube.com/results?search_query=${data?.title}`} target="blank"
                      className="yt_det flex items-center flex-row cursor-pointer text-[13px] font-semibold py-[0.5rem] px-[1.5rem] bg-[#ff1100] rounded-3xl w-fit hover:BxShdow TrnstionAll ">
                    <AiOutlinePlayCircle className="icon_play text-white text-[1.5rem]"/>
                    <span className='text-white pl-[1rem] text-[0.9rem] FontCb'>
                      WATCH TRAILER
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="cast">
            <div className="Cast_Text p-[3rem]">
              <h1 className="text-[2rem] ShadowText FontCb"> 
                Cast and Crew Info
              </h1>
            </div>

            <Swiper
              slidesPerView={5}
              spaceBetween={15}
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
              <div className="cast_wrap flex justify-center flex-wrap flex-row gap-4">
                {cast ? (
                  cast.map((e) => {
                    return (
                      <SwiperSlide>
                        <div className="cast_menu p-[0.6rem] cursor-grab BrderMenu rounded-xl TrnstionAll hover:BxMenu">
                          {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                          <div className="img_cast flex justify-center">
                            <img 
                                className='w-[15rem] rounded-md'
                                onLoad={handleImageLoaded} 
                                src={API_IMG + `${e.profile_path}`} alt="IMG Cast" />
                          </div>
                          <div className="cast_text pt-[0.3rem] FontCb font-semibold">
                            <h2 className='text-[15px] text-center'>
                              {e.name}
                            </h2>
                            <h3 className='text-[12px] text-center'>
                              {e.character}
                            </h3>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })
                  ) : (
                    <h2>Loading...</h2>
                    )}
              </div>
            </Swiper>
          </div>
        </motion.div>
      )
      }
  </>
  );
};
     
export default Detail;
