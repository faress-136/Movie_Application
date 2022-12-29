import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Item from '../Item/Item'
import Loading from '../Loading/Loading'
import {Helmet} from 'react-helmet'
import PeopleDetails from '../PeopleDetails/PeopleDetails'


export default function People() {


  let [people, setPeople] = useState([])
  let [page,setPage] = useState(1)
  let [isLoading, setIsLoading] = useState(false)
  let pageNumber = new Array(10).fill().map((ele,i)=>i+1)
  // console.log(pageNumber)

  function onPagination(mypage){
    setPage(mypage)
    // getTvShows(page)
  }

  async function getPeople(page){
    setIsLoading(true)
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=8f3f72381b9ca225b5983b2e4b19497f&language=en-US&page=${page}`)
    console.log(data.results);
    setPeople(data.results)
    setIsLoading(false)
  }

  useEffect(()=>{
    getPeople()
  },[])

  useEffect(()=>{
    getPeople(page) // for instantenous change on page 
  },[page])

  return (
    <>
        <Helmet>
    <title>Actors Page</title>
   </Helmet>
    <div className="container">
      {isLoading && <Loading/>}
      {!isLoading && <>
        <div className="row mt-5">

{people?.map((people)=> (<PeopleDetails  key={people.id} data={people}/>))}

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
