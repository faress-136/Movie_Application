import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom'
import MainLayout from './Components/MainLayout/MainLayout.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Home from './Components/Home/Home.jsx'
import Movies from './Components/Movies/Movies.jsx'
import About from './Components/About/About.jsx'
import People from './Components/People/People.jsx'
import Network from './Components/Network/Network.jsx'
import TvShows from './Components/TvShows/TvShows.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Details from './Components/Details/Details';
import Profile from './Components/Profile/Profile';
import PeopleInfo from './Components/PeopleInfo/PeopleInfo';
import MovieContextProvider from './Context/MovieContext';
 

function App() {


let [userData,setUserData] = useState(null)
let navigate = useNavigate

function saveUser(){
let token = localStorage.getItem("token")
let decoded = jwt_decode(token)
console.log(decoded);
setUserData(decoded)
}

function logout(){
  localStorage.removeItem("token")
  setUserData(null)
}


useEffect(()=>{
  if(localStorage.getItem("token")){
    saveUser()
  }
},[])


  const routers  = createBrowserRouter([
    {path:"/", element:<MainLayout userData= {userData} logout={logout}/>, children:[
      {path:"home", element:<ProtectedRoute userData= {userData}> <Home/> </ProtectedRoute>},
      {path:"Movie_App/", element: <Home userData= {userData}/>},
      {path:"register", element: <Register/>},
      {path:"login", element: <Login saveUser={saveUser} />},
      {path:"movies", element:<ProtectedRoute userData= {userData}> <Movies/> </ProtectedRoute>},
      {path:"tvshows", element:<ProtectedRoute userData= {userData}> <TvShows/> </ProtectedRoute>},
      {path:"people", element:<ProtectedRoute userData= {userData}> <People/> </ProtectedRoute>},
      {path:"profile", element:<ProtectedRoute userData= {userData}> <Profile userData={userData} /> </ProtectedRoute>},
      {path:"details/:id/:dest/:search", element:<ProtectedRoute userData= {userData}> <Details/> </ProtectedRoute>},
      {path:"people/:id/:movies", element:<ProtectedRoute userData= {userData}> <PeopleInfo/> </ProtectedRoute>},
      {path:"*", element: <NotFound/>}
    ]}  
  ])
  return (
   <>
  <MovieContextProvider>
      <RouterProvider router={routers}></RouterProvider>
  </MovieContextProvider>
   </>
  );
}

export default App;
