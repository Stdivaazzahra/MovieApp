import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import './Categories.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import CardList from './cardList/CardList';
import { ContextAccses } from '../../App';

const Categories = () => {
  const navigate = useNavigate();
  const { genres } = useParams();
  const { dispatch } = useContext(ContextAccses);

  const API_Cate = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US';
  const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query=' + genres;
  const [cate, setCate] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(API_SEARCH)
      .then((res) => setData((prev) => res.data.results))
      .catch((err) => console.log(err));
  }, [API_SEARCH]);

  useEffect(() => {
    axios
      .get(API_Cate)
      .then((res) => {
        setCate((prev) => res.data.genres);
      })
      .catch((err) => console.log(err));
  }, [API_Cate]);
  //CEK TOKEN
  const credential = localStorage.getItem('credential');
  if (!credential) {
    dispatch({ type: 'BELUM_MASUK' });
    return <Navigate to="/" replace />;
  }

  const getID = (id) => {
    navigate(`/DetailPage/${id}`);
  };
  //fungsi getGendres
  const getGendres = (gendres) => {
    navigate(`/categories/${gendres}`);
  };

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
        <h1>Showing Movies With "{genres.replace(genres.charAt(0), genres.charAt(0).toUpperCase())}" Genre</h1>
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
          {data?.map((item) => {
            return (
              <SwiperSlide>
                <CardList getID={getID} item={item} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default Categories;
