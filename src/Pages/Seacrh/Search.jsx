import axios from 'axios'
import './Search.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../HomePage/HomePage.css'

const Search = () => {
    const {name} = useParams()
    const API_Search = "https://api.themoviedb.org/3/search/movie?api_key=9cc1bc46ae7070abb9a43667213d613a&query="+name
    const API_IMG = "https://image.tmdb.org/t/p/w500/";
    
    const [data, setData] = useState()
    useEffect(() =>{
        axios.get(API_Search)
        .then(res => setData(res.data.results))
        .catch(err => console.log(err))
    },[API_Search])
    console.log(data);

  return (
    <div className='Search_wrap'>
        <h1>Search Result "{name}"</h1>
        <div className='search_item_wrap'>
        {
            data ? data.map(item=>{
                return (
                    <Link key={item.id} className="Popular_menu_search" to={`/DetailPage/${item.id}`}>
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

export default Search