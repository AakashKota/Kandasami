import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./auth.module.scss";
import RegisterImg from "../../assets/register.png";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/config"
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';


const Register = () => {
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cPassword,setCPassword]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const navigate = useNavigate()

    const registerUser= (e) => {
        e.preventDefault();
        if(password !== cPassword){
            toast.error("Passwords not matching.");
            setIsLoading(false);
        }
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {    
         const user = userCredential.user;  
         console.log(user);
         setIsLoading(false) ;
         toast.success("Registration Successful");
         navigate("/login");
            })
            .catch((error) => {
            toast.error(error.message)
   
        });
    };
  return (
    <>
    <ToastContainer/>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
    
     <Card>
        <div className={styles.form}>
        <h2>Register</h2>
        
        <form onSubmit={registerUser}>
            <input type='text' placeholder='Email' required value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type='password' placeholder='Password' required value={password} onChange={(e)=> setPassword(e.target.value)} />
            <input type='password' placeholder='Confirm Password' required value={cPassword} onChange={(e)=> setCPassword(e.target.value)} />
            <button type='submit' className="--btn --btn-primary  --btn-block">Register</button>
           
        </form>
        
        
        <span className={styles.register}>
            <p>Already an account?</p>
            &nbsp;<Link to="/login">Login</Link>
        </span>
      </div>
      </Card>
      <div className={styles.img}>
        <img src={RegisterImg} style={{ paddingLeft: '100px',}} alt="" />
     </div>
   </section> 
   </>  
  );
};

export default Register