import React, { useEffect } from 'react';
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import Productlist from './productList/Productlist';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice';

const Product = () => {
    const { data, isLoading}= useFetchCollection("products");
    const products=useSelector(selectProducts);
    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(
        STORE_PRODUCTS({
          products:data,
        })
      );
    },[dispatch,data]);
  return (
    <section>
        <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
            <ProductFilter/>
        </aside>
        <div className={styles.content}>
            <Productlist products={products}/>
        </div>
        </div>
        
        </section>
  )
}

export default Product