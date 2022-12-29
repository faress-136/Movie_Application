import axios from 'axios'
import { data } from 'jquery';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import { Offline} from "react-detect-offline";
import DetectOffline from '../DetectOffline/DetectOffline';
import {Helmet} from 'react-helmet'

export default function Home() {

let [movies, setMovies] = useState([])
let [tv,setTv] = useState([])
let [isLoading,setIsLoading] = useState(true)

async function getTrending(type, dest){
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=8f3f72381b9ca225b5983b2e4b19497f`)
  console.log(data.results)
  dest(data.results)
  setIsLoading(false)
}


useEffect(()=>{
  getTrending("movie",setMovies)
  getTrending('tv',setTv)
},[])

  return (
    <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <div className="container">
       <Offline><DetectOffline/> </Offline>
      {isLoading && <Loading/>}
      {!isLoading && <> <div className="row mt-5">
        <div className="col-md-4">
          <div className="content d-flex justify-content-center flex-column h-100">
          <h2 className='position-relative'>Trending <br /> movies <br />to watch now</h2>
          <p className='text-muted position-relative'>most watched movies by days</p>
          </div>
        </div>
        {movies?.slice(0,10).map((movie)=> (<Item key={movie.id} data={movie}/>))}
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="content d-flex justify-content-center flex-column h-100">
          <h2 className='position-relative'>Trending <br /> TV <br />to watch now</h2>
          <p className='text-muted position-relative'>most watched tv's by days</p>
          </div>
        </div>
        {tv?.slice(0,10).map((tv)=> (<Item key={tv.id} data={tv}/>))}
      </div></>}
     
    </div>
    </>
  )
}
