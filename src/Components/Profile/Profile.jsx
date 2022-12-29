import React from 'react'
import userImg from './user4.png'
import {IconContext} from "react-icons";
import {FaRegUserCircle} from 'react-icons/fa'
import {Helmet} from 'react-helmet'

export default function Profile({userData}) {
  return (
    <>
     <Helmet>
    <title>Profile Page</title>
   </Helmet>
    <div className="container pt-5">
        <div className='mx-auto'>
        <div className="text">
                <h1 >Profile</h1>
        </div>
        <div className="container-fluid my-5 w-75 d-flex justify-content-evenly align-items-start">
            <IconContext.Provider value={{size: 120}}>
            <FaRegUserCircle />
            </IconContext.Provider>
        <div className="">
        <div className='d-flex'>
            <h4 className='my- text-capitalize'>ID :</h4>
            <h4 className='ms-4'> {userData._id}</h4>
        </div>
        <div className='d-flex my-4'>
            <h4>First Name :</h4>
            <h4 className='ms-2'> {userData.first_name}</h4>
        </div>
        <div className='d-flex my-4'>
            <h4>Last Name :</h4>
            <h4 className='ms-2'> {userData.last_name}</h4>
        </div>
        <div className='d-flex'>
            <h4 className='my- text-capitalize'>Email :</h4>
            <h4 className='ms-4'> {userData.email}</h4>
        </div>
        <div className='d-flex my-4'>
            <h4>Age :</h4>
            <h4 className='ms-2'> {userData.age}</h4>
        </div>
        </div>

        </div>
        </div>
    </div>
    </>
  )
}
