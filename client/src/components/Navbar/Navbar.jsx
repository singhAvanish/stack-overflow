import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import Avtar from '../Avtar/Avtar'
import { useSelector,useDispatch } from 'react-redux';

import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser';
import { jwtDecode } from "jwt-decode";


const Navbar = () => {
    const dispatch =useDispatch()
   var user = useSelector((state)=>(state.currentUserReducer))
   const navigate = useNavigate()
   const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
    navigate('/')
    dispatch(setCurrentUser(null))
   }
   useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [user?.token, dispatch]);

  return (
    <nav className='main-nav'>
        <div className='navbar'>
        <Link to="/" className='nav-item nav-logo'>
            <img src={logo} alt='logo'/>
        </Link>
        <Link to='/' className='nav-item nav-btn'>
            About
        </Link>
        <Link to='/' className='nav-item nav-btn'>
            Products
        </Link>
        <Link to='/' className='nav-item nav-btn'>
            For Teams
        </Link>
        <form>
        <input type='text' placeholder='search...'/>
        <img src={search} alt="search" width='18' className='search-icon'/>

       

        </form>
        {
            user==null ?
            <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
            <>
                <Avtar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color='white'><Link style={{color:'white', textDecoration:'none'}} to={`/Users/${user?.result?._id}`} className=''>{user.result.name.charAt(0).toUpperCase()}</Link></Avtar>
                <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                
            </>
        }

        </div>
    </nav>
  )
}

export default Navbar
