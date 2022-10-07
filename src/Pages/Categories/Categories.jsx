import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Categories.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

const Categories = () => {
  const {genres} = useParams()
  const Navigate = useNavigate()
  const API_Search = "https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query="+genres
  const API_IMG = "https://image.tmdb.org/t/p/w500/";

  const [data, setData] = useState()
  useEffect(() => {
    axios.get(API_Search)
    .then(res => setData(res.data.results))
    .catch(err => console.log(err))
  },[API_Search])
  console.log(data);
  console.log(genres)

  const getID = (id)=>{
    Navigate(`/DetailPage/${id}`)
}

  return (
    <div>
        <div className='Search_wrap'>
                <h1>Showing Movies With "{genres}" Genre</h1>
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
            <div className='Popular_item'>
                {
                    data ? data.map(item=>{
                        return (
                            <SwiperSlide>
                            <div onClick={()=> getID(item.id)} key={item.id} className="Popular_menu">
                                <div>
                                    
                                    <div className="img_path">
                                    <img src={API_IMG+`${item.poster_path}`} alt="Movie Popular"/>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <h4>{item.release_date}</h4>
                                </div>
                            </div>
                            </SwiperSlide>
                        )
                    })
                    :
                    <h2>Loading</h2>
                }
                </div>
      </Swiper>
    </div>
  )
}

export default Categories