import React from 'react';
import styles from "./Home.module.scss";
import Slider from "../../components/slider/Slider";
import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";


const Home = () => {
  return (
    <>

    <div style={styles.body}>
      <Slider/>
      
    </div>
    </>
  )
}

export default Home;