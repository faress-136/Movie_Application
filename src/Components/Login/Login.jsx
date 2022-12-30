import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import { useRef } from 'react'

export default function Login({saveUser}) {

let myRef = useRef("test")
  
let [user,setUser] = useState({
    email:"",
    password:""
})

let [validationError, setValidationError] = useState([])
let [apiError, setApiError] = useState(null)
let [isLoading, setIsLoading] = useState(false)
let navigate = useNavigate()

function getUserData(e){
    let myUser = {...user}
    myUser[e.target.name] = e.target.value
    setUser(myUser)
}

async function login(e){
  e.preventDefault()
  if(validateLogin()){
    setIsLoading(true)
    let {data}  = await axios.post('https://route-movies-api.vercel.app/signin',user)
    console.log(data);
    if(data.message == "success"){
      // TODO go to login
      localStorage.setItem("token",data.token)
      saveUser()
      navigate('/')
      setApiError(null)
      setIsLoading(false)
    }
    else{
      setApiError(data.message)
      setIsLoading(false)
    }
  }
  
}




function validateLogin(){
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow:false} }).messages({
      "string.empty":"Email must be valid",
    }),
    password:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).messages({
      "string.empty":"Password must not be empty",
      "string.pattern.base":"Password must be 6-30"
    })
  })

  let validateRes = schema.validate(user,{abortEarly:false})
  if(validateRes.error){
    setValidationError(validateRes.error.details)
    return false
  }
  else{
    setValidationError([])
    return true
  }
}

useEffect(()=>{
    // console.log(user);
    // console.log(validationError);

    if(user.email == ""){
      myRef.current.focus()
    }
},[user,validationError])


  return (
   <>
   <Helmet>
    <title>Login Page</title>
   </Helmet>
    <div className="container my-auto">
      <div className='mx-auto w-75'>
      <h2 className='my-4'>Login Form</h2>

      {/* {validationError.map((ele,id)=>(
        <div key={id} className="alert alert-danger">{ele.message}</div>
      ))} */}

      {apiError && <div className='alert alert-danger'>{apiError}</div>}
       

      <form onSubmit={(e)=>{login(e)}}>

        <div className='form-group mb-3'>
        <label className='mb-1' htmlFor="email">Email</label>
        <input ref={myRef} onChange={(e)=>getUserData(e)} className='form-control py-2' type="email"  id='email' name='email'/>
        <div className={validationError.filter((ele) => ele.context.label == 'email')[0] ? "alert alert-danger mt-3" : ""}>
       {validationError.filter((ele) => ele.context.label == 'email')[0]?.message}
        </div>
        </div>

        <div className='form-group mb-3'>
        <label className='mb-1' htmlFor="password">Password</label>
        <input onChange={(e)=>getUserData(e)} className='form-control py-2' type="password"  id='password' name='password'/>
        <div className={validationError.filter((ele) => ele.context.label == 'password')[0] ? "alert alert-danger mt-3" : ""}>
       {validationError.filter((ele) => ele.context.label == 'password')[0]?.message}
        </div>
        </div>

      <button className='btn btn-primary mt-3 d-flex ms-auto mt-4 mb-5'>
        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}
      </button>


      </form>

      </div>
    </div>





   </>
  )
}
