import React from 'react';
import {Routes,Route} from "react-router-dom";
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Questions from './pages/Questions/Questions';
import AskQuestion from './pages/AskQuestion/AskQuestion';
import DisplayQuestion from './pages/Questions/DisplayQuestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfile/UserProfile';
import ForgotPassword from './pages/Forgot-password/FotgotPassword';
import ResetPassword from './pages/Forgot-password/ResetPassword';


const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Auth' element={<Auth></Auth>}></Route>
        <Route path='/Questions' element={<Questions></Questions>}></Route>
        <Route path='/AskQuestion' element={<AskQuestion></AskQuestion>}></Route>
        <Route path='/Questions/:id' element={<DisplayQuestion></DisplayQuestion>}></Route>
        <Route path='/Tags' element={<Tags></Tags>}> </Route>
        <Route path='/Users' element={<Users></Users>}></Route>
        <Route path='/Users/:id' element={<UserProfile></UserProfile>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/reset-password/:token' element={<ResetPassword></ResetPassword>}></Route>
       
    </Routes>
    
  )
}

export default AllRoutes
