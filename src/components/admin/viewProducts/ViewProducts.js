import React, { useEffect, useState } from 'react';
import styles from ".//ViewProducts.modules.scss"
import { toast } from 'react-toastify';
import { collection, query, where, onSnapshot, orderBy, doc } from "firebase/firestore";
import { db } from '../../../firebase/config';
import { Link } from 'react-router-dom';
import {FaEdit, FaTrashAlt} from "react-icons/fa";


const ViewProducts = () => {
  const[products,setProducts]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  useEffect(()=>{
    getProducts()
  },[])

  const getProducts=()=>{
    setIsLoading(true);
    try{
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt","desc"));     
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs)
        const allProducts= snapshot.docs.map((doc)=> ({
          id: doc.id,
          ...doc.data()
        }))
      console.log(allProducts);
      setProducts(allProducts);
      setIsLoading(false);
  });
  


    } catch(error){
      setIsLoading(false);
      toast.error(error);
    }
  }
  return (
    <>
    <div className={styles.table}>
      <h2>All Product</h2>
      {products.length===0 ? (
        <p>No Product found.</p>
      ):(
        <table>
          <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>         
          </tr>
          {products.map((product,index) => {
            const{id,name,price,imageURL,category}= product;
            return(
              <tr key={id}>
                <td>
                  {index +1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width: "100px"}} />
                </td>
                <td>{name}</td>
                <td>{category}</td>
                <td>{`Rs${price}`}</td>
                <td>
                  <Link to="../../admin/addProducts">
                    <FaEdit size={20} color='green'/>
                  </Link>
                  &nbsp;&nbsp;
                  <FaTrashAlt size={20} color='red'/>
                </td>
              </tr>
            )
          })}
        </table>
      )}
    </div>
    </>
  )
}

export default ViewProducts