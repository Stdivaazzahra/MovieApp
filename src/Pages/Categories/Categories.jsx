import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Categories.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';  
import CardList from './cardList/CardList';
const Categories = () => {
  const navigate = useNavigate();
  const { genres } = useParams();

  const API_Cate = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US';
  const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query=' + genres;
  const [cate, setCate] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(API_SEARCH)
      .then((res) => setData(res.data.results))
      .catch((err) => console.log(err));
  }, [API_SEARCH]);

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
  //fungsi getGendres
  const getGendres = (genres) => {
    navigate(`/Categories/${genres}`);
  };

  return (
    <div className="category_page pt-[6em]">
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
      <div className="Search_wrap">
        <h1 className="text-[2.1em] font-semibold ShadowText FontCb pl-[3rem] pb-[2rem] pr-[2rem]">
          Showing Movies With " {genres.replace(genres.charAt(0), genres.charAt(0).toUpperCase())}" Genre
        </h1>
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