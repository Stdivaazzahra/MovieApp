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

const HomePage = () => {
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const API_POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`;
  const API_Cate = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US';
  const [imageLoaded, setImageLoaded] = useState(true);
  //UseState
  //UseEffect
  //axios
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

  const getGendres = (gendres) => {
    navigate(`/Categories/${gendres}`);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };
  return (
    <>
      <div className="HomePage">
        <div className="HomaPage_img">
          <img src={image} alt="Img HomePage" />
        </div>
        <div className="HomePage_Text">
          <h1>Doctor Strange in the Multiverse of Madness</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dolore quos ipsa dicta natus quaerat odit cumque accusamus ducimus temporibus!</p>
          <div className="yt">
            <AiOutlinePlayCircle className="icon_play_home" />
            <a href="https://youtu.be/Rt_UqUm38BI" target="blank">
              WATCH TRAILER
            </a>
          </div>
        </div>
      </div>

      <div className="popular_wrap">
        <div className="popular_text">
          <h1>Popular Movie</h1>
          <Link to="/AllMovie" className="All_Movie">
            <h2>
              See All Movie
              <span className="Arrow_icon">
                <TiArrowRightOutline />
              </span>
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
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <div className="Popular_item">
          {data &&
            data.map((item) => {
              return (
                <SwiperSlide>
                  <div onClick={() => getID(item.id)} key={item.id} className="Popular_menu">
                    {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                    <img className="poster" onLoad={handleImageLoaded} src={API_IMG + `${item.poster_path}`} alt="Movie Popular" />
                    <div className="dec">
                      <h3>{item.title}</h3>
                      <h4>{item.release_date}</h4>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </div>
      </Swiper>

      <div className="popular_wrap">
        <div className="popular_text">
          <h1>Browse by Genres</h1>
          <Link to="/AllMovie" className="All_Movie">
            <h2>
              See All Movie
              <TiArrowRightOutline className="Arrow_icon" />
            </h2>
          </Link>
        </div>

        <div className="CateBtn_Wrap">
          <div className="cate_btn">
            {cate &&
              cate.map((e) => (
                <button key={e.id} onClick={() => getGendres(e.name.toLowerCase())}>
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
        <div className="Popular_item">
          {data ? (
            data.map((item) => {
              return (
                <SwiperSlide>
                  <div onClick={() => getID(item.id)} key={item.id} className="Popular_menu">
                    {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                    <img className="poster" onLoad={handleImageLoaded} src={API_IMG + `${item.poster_path}`} alt="Movie Popular" />
                    <div className="dec">
                      <h3>{item.title}</h3>
                      <h4>{item.release_date}</h4>
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
