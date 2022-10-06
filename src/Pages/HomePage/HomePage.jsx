import React, { useEffect, useState } from 'react'
import './HomePage.css'
import image from './../Images/Header1.jpg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { TiArrowRightOutline } from 'react-icons/ti';
import { AiOutlinePlayCircle } from 'react-icons/ai';

const HomePage = () => {
    // const {id} = useParams()
    // const API = "https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a&page"
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
    const API_POPULAR = `https://api.themoviedb.org/3/discover/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`
//UseState
//UseEffect
//axios
const navigate = useNavigate()
const [data, setData] = useState()

useEffect(()=> {
    axios.get(API_POPULAR)
    .then(res => {
        // const popularFilm = res.data.results.filter(e => {
        //         return e.popularity > 1500
        // })
        setData(res.data.results)
        console.log(res.data)
    })
    .catch(err => console.log(err))
},[API_POPULAR])

const getID = (id)=>{
    navigate(`/DetailPage/${id}`)
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
    <div className='Popular_item'>
        {
            data ? data.map(item=>{
                return (
                    <div onClick={()=> getID(item.id)} key={item.id} className="Popular_menu">
                        <div>
                            
                            <div className="img_path">
                            <img src={API_IMG+`${item.poster_path}`} alt="Movie Popular"/>
                            </div>
                            <h3>{item.title}</h3>
                            <h4>{item.release_date}</h4>
                        </div>
                    </div>
                )
            })
            :
            <h2>Loading</h2>
        }
        </div>

        
    <div className='popular_wrap'>
    <div className='popular_text'>
        <h1>
        Browse by Category
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
            <button>Crime</button>
            <button>Trailer</button>
            <button>Drama</button>
            <button>Animation</button>
            <button>Family</button>
            <button>Action</button>
            <button>Fantasy</button>
            <button>Romance</button>
            <button>Science Fiction</button>
        </div>
    </div>

    </div>
        <div className="Popular_item">
            {
                data ? data.map(item=>{
                    return (
                        <div onClick={()=> getID(item.id)} key={item.id} className="Popular_menu">
                            <div>
                                <div className="img_path">
                                <img src={API_IMG+`${item.poster_path}`} alt="Movie Popular"/>
                                </div>
                                <h3>{item.title}</h3>
                                <h4>{item.release_date}</h4>
                            </div>
                        </div>
                    )
                })
                :
                <h2>Loading</h2>
            }
        </div>
    </>
  )
}

export default HomePage