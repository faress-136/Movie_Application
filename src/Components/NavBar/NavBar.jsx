import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsSpotify, BsYoutube} from 'react-icons/bs'

export default function NavBar({userData,logout}) {
  function facebook(){
    window.location.replace('https://facebook.com').target('__blank');
  }
  return (
    <>

<nav className="navbar navbar-expand-lg bg-dark navbar-dark px-4 py-3">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2" to="home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="home">Home</Link>
</li>


<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="movies">Movies</Link>
</li>

<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="tvshows">Tv Shows</Link>
</li>

<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="people">People</Link>
</li>

{/* <li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="about">About</Link>
</li>

<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="network">Network</Link>
</li> */}

</ul>: ""}


    <div className='d-flex ms-auto align-items-center w-50 justify-content-between'>
      <input className='form-control me-4' type="text" placeholder='Search...'/>


      <ul className='d-flex mb-0 me-0 me-md-3 makepointer'>
        <li className='me-4'>
          <a className="nav-link active" aria-current="page" href="https://facebook.com" target="_blank" rel="noreferrer">
          <BsFacebook />
          </a>
        </li>
        <li className='me-4'>
          <a className="nav-link active" aria-current="page" href="https://spotify.com" target="_blank" rel="noreferrer">
          <BsSpotify />
          </a>
        </li>
        <li className='me-4'>
        <a className="nav-link active" aria-current="page" href="https://instagram.com" target="_blank" rel="noreferrer">
          <BsInstagram />
        </a>
        </li>
        <li className='me-4'>
        <a className="nav-link active" aria-current="page" href="https://youtube.com" target="_blank" rel="noreferrer">
          <BsYoutube />
        </a>
        </li>
      </ul>


      <ul className="navbar-nav  mb-2 mb-lg-0 ">

        {userData ?<>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="profile">Hi,{userData.first_name}</Link>
        </li>
        
         <li className="nav-item">
          <Link className="nav-link active" aria-current="page" onClick={logout} to="login">Logout</Link>
        </li>
        </>
        :
        <>
           <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="register">Register</Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="login">Login</Link>
        </li>
        </>}

     


      </ul>
    </div>
     
    </div>
  </div>
</nav>


    </>
  )
}
