import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({data,searchmovie}) {
  // console.log(searchmovie);
  return (
    <div className="col-md-2 position-relative">
        <div className="item position-relative overflow-hidden">
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+data.poster_path} alt="" />
            <Link to={`/details/`+data.id+"/"+data.media_type+"/"+searchmovie}>
            <div className="overlay d-flex align-items-center">
                <p className='text-center text-white'>{data.overview.split(" ").splice(0,20).join(" ")}</p>
            </div>
            </Link>
        </div>
        <h4 className='text-center mt-2 mb-3'>{data.title} {data.name}</h4>
        <div className="vote bg-info p-2 position-absolute top-0 end-0">{data.vote_average.toFixed(1)} </div>

      

    </div>
  )
}
