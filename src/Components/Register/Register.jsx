import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'

export default function Register() {
let [user,setUser] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    age:0
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

async function register(e){
  e.preventDefault()
  if(validateRegister()){
    setIsLoading(true)
    let {data}  = await axios.post('https://route-movies-api.vercel.app/signup',user)
    console.log(data);
    if(data.message == "success"){
      // TODO go to login
      navigate('/login')
      setApiError(null)
      setIsLoading(false)
    }
    else{
      setApiError(data.message)
      setIsLoading(false)
    }
  }
  
}

function validateRegister(){
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(20).required().messages({
      "string.empty":"First Name must not be empty",
      "string.min":"First Name must be greater than 3 characters",
      "string.max":"First Name must be smaller than 20 characters"
    }),
    last_name: Joi.string().min(3).max(20).required().messages({
      "string.empty":"Last Name must not be empty",
      "string.min":"Last Name must be greater than 3 characters",
      "string.max":"Last Name must be smaller than 20 characters"
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow:false} }).messages({
      "string.empty":"Email must be valid",
    }),
    password:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).messages({
      "string.empty":"Password must not be empty",
      "string.pattern.base":"Password must be 6-30"
    }),
    age: Joi.number().min(10).max(100).required().messages({
      "number.min":"Age must be greater than 10",
      "number.max":"Please enter a valid age"
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
},[user,validationError])


  return (
   <>
    <Helmet>
    <title>Register Page</title>
   </Helmet>
    <div className="container my-auto">
      <div className='mx-auto w-75'>
      <h2 className='my-4'>Registeration Form</h2>

      {/* {validationError.map((ele,id)=>(
        <div key={id} className="alert alert-danger">{ele.message}</div>
      ))} */}

      {apiError && <div className='alert alert-danger'>{apiError}</div>}
       

      <form onSubmit={(e)=>{register(e)}}>
        <div className='form-group mb-3'>
        <label className='mb-1' htmlFor="first_name">First Name</label>
        <input  onChange={(e)=>getUserData(e)} className='form-control py-2' type="text"  id='first_name' name='first_name'/>
        <div className={validationError.filter((ele) => ele.context.label == 'first_name')[0] ? "alert alert-danger mt-3" : ""}>
       {validationError.filter((ele) => ele.context.label == 'first_name')[0]?.message}
        </div>

        </div>

        <div className='form-group mb-3'>
        <label className='mb-1' htmlFor="last_name">Last Name</label>
        <input onChange={(e)=>getUserData(e)} className='form-control py-2' type="text"  id='last_name' name='last_name'/>
        <div className={validationError.filter((ele) => ele.context.label == 'last_name')[0] ? "alert alert-danger mt-3" : ""}>
       {validationError.filter((ele) => ele.context.label == 'last_name')[0]?.message}
        </div>
        </div>

        <div className='form-group mb-3'>
        <label className='mb-1' htmlFor="email">Email</label>
        <input onChange={(e)=>getUserData(e)} className='form-control py-2' type="email"  id='email' name='email'/>
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

        <div className='form-group mb-3'>
        <label className='mb-1' htmlFor="age">Age</label>
        <input onChange={(e)=>getUserData(e)} className='form-control py-2' type="number"  id='age' name='age'/>
        <div className={validationError.filter((ele) => ele.context.label == 'age')[0] ? "alert alert-danger mt-3" : ""}>
       {validationError.filter((ele) => ele.context.label == 'age')[0]?.message}
        </div>
        </div>

      <button className='btn btn-primary mt-3 d-flex ms-auto mt-4 mb-5'>
        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : "Sign up"}
      </button>


      </form>

      </div>
    </div>





   </>
  )
}
