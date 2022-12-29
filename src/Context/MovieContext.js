import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const MovieContext = createContext([])

export default function MovieContextProvider(props) {
  let [movies, setMovies] = useState([])
  let [isLoading, setIsLoading] = useState(false)


  async function getTrending(type, dest,page){
    setIsLoading(true)
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=8f3f72381b9ca225b5983b2e4b19497f&page=${page}`)
    dest(data.results)
    setIsLoading(false)
  }
  

  useEffect(()=>{
    getTrending("movie",setMovies,1)
  },[])
  return <MovieContext.Provider value={{ getTrending, movies,setMovies,isLoading, setIsLoading }}>
{props.children}
  </MovieContext.Provider>
}
