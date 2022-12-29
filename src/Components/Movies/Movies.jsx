import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import Loading from '../Loading/Loading'
import {Helmet} from 'react-helmet'
import { useContext } from 'react'
import { MovieContext } from '../../Context/MovieContext'

export default function Movies() {

  let [page,setPage] = useState(1)
  let [myswitch,setMySwitch] = useState(false)
  let {getTrending, movies,setMovies,isLoading,setIsLoading } = useContext(MovieContext)


  let pageNumber = new Array(10).fill().map((ele,i)=>i+1)


  function onPagination(mypage){
    setPage(mypage)
  }

  async function searchMovie(e){
    setIsLoading(true)
    if(e.target.value){
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8f3f72381b9ca225b5983b2e4b19497f&language=en-US&query=${e.target.value}&include_adult=false`)
      setMovies(data.results)
      setMySwitch(true)
      setIsLoading(false)
      // console.log(data.results);
    }
    else{
      getTrending("movie",setMovies,page)
      setMySwitch(false)
    }
   
  }



  useEffect(()=>{
    getTrending("movie",setMovies,page) // for instantenous change on page 
  },[page])
  
    return (
      <>
       <Helmet>
    <title>Movies Page</title>
   </Helmet>
      <div className="container">

        <input onChange={searchMovie} className='ms-2 mt-5 form-control' type="text" placeholder='Search....'/>
        {isLoading && <Loading/>}
        {!isLoading && <>
          <div className="row mt-5">
  
  {movies?.map((movie)=> (<Item key={movie.id} searchmovie={myswitch} data={movie}/>))}
  
  </div>
  
  <nav aria-label="Page navigation example" className='d-flex justify-content-center my-3'>
  <ul className="pagination">
  {pageNumber.map((ele)=>(
   <li key={ele} onClick={()=>onPagination(ele)} className="page-item clickable"><a className="page-link">{ele}</a></li>
  ))}
  
  </ul>
  </nav>
        </>}
  
      </div>
      </>
    )
  }
  