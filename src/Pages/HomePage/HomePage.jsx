import React, { useEffect, useState } from 'react'
import './HomePage.css'
import image from './../Images/Header1.jpg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { TiArrowRightOutline } from 'react-icons/ti';
import { AiOutlinePlayCircle } from 'react-icons/ai';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const HomePage = () => {
    // const {id} = useParams()
    // const API = "https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a&page"
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
    const API_POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`
    // const API_Cate = `https://api.themoviedb.org/3/movie/${id}?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US`
    const API_Cate = "https://api.themoviedb.org/3/genre/movie/list?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US"
//UseState
//UseEffect
//axios
const navigate = useNavigate()
const [data, setData] = useState()
const [cate, setCate] = useState()

useEffect(()=> {
    axios.get(API_POPULAR)
    .then(res => {
        // const popularFilm = res.data.results.filter(e => {
        //         return e.popularity > 1500
        // })
        setData(res.data.results.slice(0,15))
        console.log(res.data)
    })
    .catch(err => console.log(err))
},[API_POPULAR])

useEffect(() => {
  axios.get(API_Cate)
  .then(res => {
    setCate(res.data.genres)
})
  .catch(err => console.log(err))
}, [API_Cate])

console.log(cate)

const getID = (id)=>{
    navigate(`/DetailPage/${id}`)
}

const getGendres = (gendres)=>{
    navigate(`/Categories/${gendres}`)
}

console.log(data)

  return (
    <>
    <div className='HomePage'>
        <div className='HomaPage_img'>
            <img src={image} alt="Img HomePage" />
        </div>
        <div className='HomePage_Text'>
            <h1>Doctor Strange in the Multiverse of Madness</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dolore quos ipsa dicta natus quaerat odit cumque accusamus ducimus temporibus!</p>
            <div className="yt">
                <AiOutlinePlayCircle className='icon_play_home'/> 
                <a  href="https://youtu.be/Rt_UqUm38BI" target="blank">WATCH TRAILER</a>
            </div>
        </div>
    </div>

    <div className='popular_wrap'>
        <div className='popular_text'>
        <h1>
        Popular Movie
        </h1>
        <Link to='/AllMovie' className='All_Movie'>
            <h2>
                See All Movie 
                <span className='Arrow_icon'>
                <TiArrowRightOutline/>
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


        
    <div className='popular_wrap'>
    <div className='popular_text'>
        <h1>
        Browse by Genres
        </h1>
        <Link to='/AllMovie' className='All_Movie'>
            <h2>
                See All Movie 
                <TiArrowRightOutline className='Arrow_icon'/>
            </h2>
        </Link>
    </div>




    
    <div className="CateBtn_Wrap">
        
        <div className="cate_btn">
            {
                cate && cate.map(e=> <button key={e.id} onClick={()=>getGendres(e.name.toLowerCase())}>{e.name}</button>)
            }

        </div>
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
    </>
  )
}

export default HomePage