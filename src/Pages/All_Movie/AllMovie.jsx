
import React, { useEffect, useState } from 'react'
import './AllMovie.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import image2 from './../Images/Header3.jpg'

const AllMovie = () => {
    const API_ALL = "https://api.themoviedb.org/3/movie/popular?api_key=9cc1bc46ae7070abb9a43667213d613a";
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
//UseState
//UseEffect
//axios
const [data, setData] = useState()
useEffect(()=> {
    axios.get(API_ALL)
    .then(res => setData(res.data.results))
    .catch(err => console.log(err))
    
},[])
console.log(data);

  return (
    <div>
        <header className='listAll_img'>
            <img src={image2} alt="Header List All" />
        </header>
        <div className='All_text'>
            <h1>All Movies</h1>
        </div>
        <div className='Popular_item_wrap'>
        {
            data ? data.map(item=>{
                return (
                    <Link key={item.id} className="Popular_menu" to={`/DetailPage/${item.id}`}>
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
        }
        </div>
    </div>
  )
}

export default AllMovie