import React from 'react'
import { Link } from 'react-router-dom'

export default function PeopleDetails({data}) {
//   console.log(searchmovie);
let mov = null
if(data.known_for[0].original_name){
    mov = data.known_for[0].original_name
}
else{
    mov = data.known_for[0].original_title

}
  return (
    <div className="col-md-2 position-relative">
        <div className="item position-relative overflow-hidden">
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+data?.profile_path} alt="" />
            <Link to={`/people/`+data.id+"/"+mov}>
            <div className="overlay d-flex align-items-center">
                <p className='text-white text-center mx-auto'>Known for: <br />  {data.known_for[0].original_title ? data.known_for[0].original_title:data.known_for[0].original_name}</p>
            </div>
            </Link>
        </div>
        <h4 className='text-center mt-2 mb-3'>{data.name}</h4>
        <div className="vote bg-info p-2 position-absolute top-0 end-0">{data.popularity.toFixed(1)} </div>

      

    </div>
  )
}
