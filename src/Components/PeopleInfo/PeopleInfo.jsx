import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import {Helmet} from 'react-helmet'


export default function PeopleInfo() {

let {id,movies} = useParams()
let [details,setDetails]=useState([])
let [isLoading,setIsLoading] = useState(true)
console.log(id)
console.log(movies)



async function getPeopleDetails(){
let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=8f3f72381b9ca225b5983b2e4b19497f&language=en-US`)
console.log("Actor Details");
console.log(data);
setDetails(data)
setIsLoading(false)
}

useEffect(()=>{
    getPeopleDetails()
},[])

  return (
    <>
        <Helmet>
    <title>{`${details?.original_title ? details?.original_title : details.original_name} | Details Page`}</title>
   </Helmet>
    <div className="container my-5">
        {isLoading && <Loading/>}
        {!isLoading && <>
            <div className="row ">
            <div className="col-md-3">
                <img className='w-100 my-auto h-100' src={"https://image.tmdb.org/t/p/w500"+details?.profile_path} alt="" />
            </div>
            <div className="col-md-9">
                <div className="movieContent">
                    <h1 className='text-capitalize'>{details?.name}</h1>
                    <p className='fs-5 text-muted mt-3'>Place of birth : {details?.place_of_birth}</p>
                    <ul className='list-unstyled d-flex justify-content-start'>

                    {details?.genres?.map((genre,key)=><div key={key} className='bg-info my-1 p-2 me-3 rounded'> {genre.name}</div>)}

                    </ul>

                    <p className='my-3'>Birthday : {details?.birthday}</p>
                    <p className='my-3'>Known For : {details?.known_for_department}</p>
                    <p className='my-3'>Famous For : {movies}</p>
                    <p className='my-3'>Popularity : {details?.popularity.toFixed(1)}</p>

                    <p className='text-muted fs-5'>{details.biography?`${details.biography.split(' ').splice(0,70).join(' ')} ......`: ""}</p>


                </div>

            </div>
        </div>
        </>}
        
    </div>
    
    </>
  )
}
 