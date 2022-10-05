import React, { useEffect, useState } from 'react'
import './HomePage.css'
import image from './../Images/Header1.jpg'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { TiArrowRightOutline } from 'react-icons/ti';
import { AiOutlinePlayCircle } from 'react-icons/ai';

const HomePage = () => {
    // const {id} = useParams()
    const API = "https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a"
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
//UseState
//UseEffect
//axios
const [data, setData] = useState()
// const navigate = useNavigate()
const navigate = useNavigate()
useEffect(()=> {
    axios.get(API)
    .then(res => setData(res.data.results))
    .catch(err => console.log(err))
},[])
console.log(data);

const getID = (id)=>{
    navigate(`/DetailPage/${id}`)
}

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
                <AiOutlinePlayCircle className='icon_play' /> 
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
        {/* {
            data ? data.map(item=>{
                return (
                    <Link onClick={()=>getID(item.id)} key={item.id} className="Popular_menu" to={`/DetailPage/${item.id}`}>
                        <div>
                            <div className="img_path">
                            <img src={API_IMG+`${item.poster_path}`} alt="Movie Popular"/>
                            </div>
                            <h3>{item.title}</h3>
                            <h4>{item.release_date}</h4>
                        </div>
                    </Link>
                )
            })
            :
            <h2>Loading</h2>
        } */}
        {
            data ? data.map(item=>{
                return (
                    <div onClick={()=>getID(item.id)} key={item.id} className="Popular_menu">
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