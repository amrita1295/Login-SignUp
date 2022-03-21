import React,{useContext, useRef, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import styled from 'styled-components';
// import {GrClose} from 'react-icons/gr';
// import {CgProfile} from 'react-icons/cg';
// import {FiCamera} from 'react-icons/fi';
// import {BiHomeAlt} from 'react-icons/bi';
import M from 'materialize-css'
import '../App.css'
const StyledButton = styled.button`
font-size: 1.7rem;
`
const StyledIcon = styled.div`
font-size: 1.5rem;
margin-left:-10px;
margin-top: 2px;
@media only screen and (max-width:800px){
    margin-left: -15px;
}
`
const StyledIcon1=styled.div`
font-size:1.5rem;
margin-left: -35px;
margin-top:2px;
`
const Navbar=()=>{
    const {state,dispatch}=useContext(UserContext)
    const history = useHistory()
    // const searchModal=useRef(null)
    
    // const [state, dispatch]=useContext(UserContext)
    // const history=useHistory()
    // useEffect(()=>{
    //     M.Modal.init(searchModal.current)
    // },[])
    const renderList=()=>{
        
            return [
               <li key="6"><Link to="/signin">SignIn</Link></li>,
               <li key="7"><Link to="/signup">SignUp</Link></li>
            ]
        
    }
    return (
        <nav className="navbar">
        <div className="nav-wrapper white">
        <Link to ={state?"/":"/signin"} className="brand-logo left">Yeah</Link>
        <ul id="nav-mobile" className="right">
            {renderList()}
        </ul>
        </div>
       <div>
     
       </div>
       </nav>
    )
    
}
export default Navbar