import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Categories.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import spiner from '../../assets/spin-loader.gif';
const Categories = () => {
  const Navigate = useNavigate();
  const { genres } = useParams();

  const API_Cate = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US';
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cate, setCate] = useState();
  const [data, setData] = useState();
  const [genre, setGenre] = useState(genres);
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query=' + genre)
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));
  }, [genre]);

  useEffect(() => {
    axios
      .get(API_Cate)
      .then((res) => {
        setCate(res.data.genres);
      })
      .catch((err) => console.log(err));
  }, [API_Cate]);
  console.log(data);
  console.log(genres);

  const getID = (id) => {
    Navigate(`/DetailPage/${id}`);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const getGendres = (gendres) => {
    setGenre(gendres);
    const API_Search = 'https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query=' + gendres;
    axios
      .get(API_Search)
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  console.log(imageLoaded);
  return (
    <div className="category_page">
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
      <div className="Search_wrap">
        <h1>Showing Movies With "{genre.replace(genre.charAt(0), genre.charAt(0).toUpperCase())}" Genre</h1>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <div className="Popular_item">
          {data?.map((item) => {
            return (
              <SwiperSlide>
                <div onClick={() => getID(item.id)} key={item.id} className="Popular_menu">
                  {!imageLoaded && <img className="spin-loader" src={spiner} alt="spin loader" />}
                  <img className={imageLoaded ? 'poster' : 'ended'} onLoad={handleImageLoaded} src={API_IMG + `${item.poster_path}`} alt="Movie Category" />
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
    </div>
  );
};

export default Categories;
