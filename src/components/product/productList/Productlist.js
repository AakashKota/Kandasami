import React, { useState } from 'react';
import styles from "./Productlist.modules.scss";
import {BsFillGridFill} from "react-icons/bs";
const Productlist = () => {
  const [grid,setGrid]=useState(true)
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill />
        </div>

      </div>
      
      </div>
  )
}

export default Productlist;