import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Detail.css";
import { BiStar } from 'react-icons/bi';

const Detail = () => {

    const[data, setData] = useState()
    const params = useParams()
    const {id} = params.id;
    // const API_Detail = "https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a&query="+id;
    const API_Detail = (`https://api.themoviedb.org/3/movie/${id}?api_key=9cc1bc46ae7070abb9a43667213d613a`);
    const API_IMG = "https://image.tmdb.org/t/p/w500/";

    useEffect(() => {
        axios.get(API_Detail)
        .then(ress => setData(ress.data.results[0]))
        .catch(err => console.log(err))
    },[setData, API_Detail])
    console.log(data);
    
  return (
    <div className='detail_wrap'>
        <div className='background_Detail'>
            {
                data && (
                            <div className='detail_item'>
                                <img src={API_IMG+`${data.poster_path}`} alt="Background_Detail" />
                                <div className="detail_text">
                                <h1>{data.title}</h1>
                                <h3>Release Date : {data.release_date}</h3>
                                {/* <h3>Release Date : {data.genre_ids.slice(0)}</h3> */}
                                <p>{data.overview}</p>
                                <h3> <span className='start_icon'> <BiStar /> </span>
                                    {data.vote_average}</h3>
                                </div>
                            </div>
                        
                    )
                }
        </div>
    </div>
  )
}

export default Detail