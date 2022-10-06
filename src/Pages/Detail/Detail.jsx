import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Detail.css";
import { BiStar } from 'react-icons/bi';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { RiCloseCircleLine } from 'react-icons/ri';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Detail = () => {

    const[data, setData] = useState()
    const[video, setVideo] = useState()
    const[cast, setCast] = useState()
    const[open, setOpenVideo] = useState(false)

    const {id} = useParams();
    

    const API_Detail = `https://api.themoviedb.org/3/movie/${id}?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US`
    // const API_Cast = "https://api.themoviedb.org/3/search/movie/popular/credits?api_key=9cc1bc46ae7070abb9a43667213d613a"
    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    const LINK_VIDEO_API = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US`
    
    const API_Cast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9cc1bc46ae7070abb9a43667213d613a`

    console.log(id)

    useEffect(() => {
        axios.get(API_Detail)
        .then(ress => setData(ress.data))
        .catch(err => console.log(err))
    },[setData, API_Detail])
    console.log(data)
    
    useEffect(() => {
        axios.get(LINK_VIDEO_API)
        .then(ress => {
            setVideo(ress.data.results)
            console.log(ress.data.results)
        })
        .catch(err => console.log(err))
    },[LINK_VIDEO_API])
    // console.log(video?.AD.link)

    useEffect(() => {
        axios.get(API_Cast)
        .then(ress => setCast(ress.data.cast.slice(0,10)))
        .catch(err => console.log(err))
    },[API_Cast])

    const openVideo = () =>{
        setOpenVideo(prev => !prev)
    }
  return (
    <div className='detail_wrap'>
        <div className='background_Detail'>
            <div className='detail_item'>
                <img src={API_IMG+`${data?.backdrop_path}`} alt="Background_Detail" />
                <div className="detail_text">
                    <h1>{data?.title}</h1>
                    <h3>
                    {
                        data?.genres.map(e=>{
                        return <span className='genre'>{e.name}</span>
                        })
                    }   
                    </h3>
                    <p>{data?.overview}</p>
                    <h3> <span className='start_icon'> <BiStar /> </span>
                        {data?.vote_average.toFixed(1)}</h3>
                    <button onClick={openVideo} className="yt_det">
                        <AiOutlinePlayCircle className='icon_play' /> 
                        <span>Watch</span>
                    </button>
                </div>
            </div>
            <div className={`video ${open ? 'open' : ''}`}>
              {video && (<div className='wrapper_video'>
                            <iframe className='video__' src={`https://www.themoviedb.org/video/play?key=${video[0].key}`} frameborder="0" title='link video'></iframe>
                        </div>)}
                <span onClick={openVideo}> <RiCloseCircleLine className="close"/> </span>
            </div>        
        </div>



        <div className="cast">
            <div className="Cast_Text">
                <h1> Cast and Crew Info</h1>
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


            <div className='cast_wrap'>
            {
                cast ? cast.map(e=>{
                    return (
                        <SwiperSlide>
                            <div className="cast_menu">
                                <div className="img_cast">
                                    <img src={API_IMG+`${e.profile_path}`} alt="IMG Cast" />
                                </div>

                                <div className="cast_text">
                                    <h2>{e.name}</h2>
                                    <h3>{e.character}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                       

                    )

                })
                :
                <h2>Loading...</h2>
            }
        </div>
        </Swiper>
        </div>
    

    </div>
    
  )
}

export default Detail