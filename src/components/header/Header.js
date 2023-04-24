import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link , NavLink, useNavigate} from 'react-router-dom';
import {FaShoppingCart , FaTimes, FaUserCircle} from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import logoImg from "../../assets/logo.png";
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';





const logo=(
  <div className={styles.logo}>
          <Link to="/">
           <h2>
           <img src={logoImg} alt="" style={{width:320}}/>
            </h2>
            
          </Link>
        </div>
);

const cart=(
  <span className={styles.cart}>
                <Link to="/cart">
                  Cart
                  <FaShoppingCart size={20}/>
                  <p>0</p>
                </Link>
              </span>
);
const activeLink=(
  ({isActive})=> (isActive ? `${styles.active}`:``)
)

const Header = () => {
  const[showMenu, setShowMenu]=useState(false);
  const[displayName, setdisplayName]=useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {    
        // console.log(user);   
        
        if(user.displayName== null){
          const u1=user.email.substring(0, user.email.indexOf("@"));
          const uName=u1.charAt(0).toUpperCase()+u1.slice(1);
          setdisplayName(uName);
        }
        else{
        setdisplayName(user.displayName);
        }        
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName:displayName,
          userID:user.uid,
        }));
      } else {
        
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER())
      }
    },[dispatch, displayName]);
  })
  const toggleMenu=()=>{
    setShowMenu(!showMenu)
  };
  const hideMenu=()=>{
    setShowMenu(false)
  };
  const logoutUser=()=>{
    signOut(auth).then(() => {
      toast.success("Logout Successful");
      navigate("/")
      
    }).catch((error) => {
      toast.error(error.message);
    });
  };



  return (
    <header>
      
      <div className={styles.header}>
        {logo}


        <nav className={showMenu ? `${styles["show-nav"]}`: `${styles["hider-menu"]}`}>
          <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]} ` :`${styles["nav-wrapper"]}`}
          onClick={hideMenu}>
          </div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}

              <FaTimes size={20} color='#fff' onClick={hideMenu}/>
            </li>
            <li>
              <AdminOnlyLink>
               <Link to="/admin/home">
              <button className='--btn-primary'>Admin</button>
              </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
        

          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
                </ShowOnLogout>
                <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
                <ShowOnLogin>
                <a href="#home">
                    <FaUserCircle size={16}/> {displayName}
                  </a>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
                </ShowOnLogin>
              </span>
              {cart}
              
          </div>
         
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiMenuAlt2 size={28} onClick={toggleMenu}/>        
        </div>

        </div>

    </header>
  );
};

export default Header;