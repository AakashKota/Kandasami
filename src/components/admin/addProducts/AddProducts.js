import { useState } from 'react';

import styles from './AddProducts.module.scss';
import Card from "../../card/Card";
import {db, storage} from "../../../firebase/config";
import Loader from "../../loader/Loader";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from 'react-toastify';
import { Await, useNavigate } from 'react-router';
import { Timestamp, addDoc, collection } from 'firebase/firestore';


const categories=[
  {id:1, name:"Wedding"},
  {id:2, name:"Silk"},
  {id:3, name:"Kanchepuram"},
  {id:4, name:"Cotton"},
];
const initialState={
    name: "",
    imageURL: "",
    price:0,
    category: "",
    brand: "",
    desc: "", 
}




const AddProducts = () => {
  const [product,setProduct]=useState({
    ...initialState
  });
  const [uploadProgress,setUploadProgress]=useState(0);
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate()
  
  const handleInputChange = (e)=>{
    const{name,value}=e.target;
    setProduct({...product, [name]: value});
  };
  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    const storageRef = ref(storage, `kandasami/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // console.log(file);
    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress)
    }, 
  (error) => {
    toast.error(error.message);
  }, 
  () => {    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProduct({...product, imageURL: downloadURL});
      toast.success("Image Uploaded successfullly!!!");
    });
  }
);

  };

  const addProduct=(e)=>{
    e.preventDefault();
    console.log(product);
    setIsLoading(true);

    try{
    const docRef = addDoc(collection(db, "products"), {
      name: product.name,
      imageURL:product.imageURL,
      price:Number(product.price),
      category:product.category,
      brand:product.brand,
      desc:product.imageURL ,
      createdAt:Timestamp.now().toDate()
      
    });
    setIsLoading(false);
    setUploadProgress(0)
    setProduct({...initialState});

    toast.success("Product Uploaded Successfully");
    navigate("/admin/all-products")
  }catch(error){
    toast.error(error.message);
  }
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.product}>
      <h1>AddProducts</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
        <label> Product Name: </label>
        <input type='text' placeholder='Product Name' required name='name' value={product.name} onChange={(e)=> handleInputChange(e)} /> 

         <label>Product Image: </label> 
         <Card cardClass={styles.group}>

          {uploadProgress === 0 ? null :(
              <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{width: `${uploadProgress}%`}}>
                {uploadProgress <100 ? `Uploading ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
              </div>
            </div>
          )}
          


          <input type='file' accept='image/*' placeholder='Product Image' name='image' onChange={(e)=> handleImageChange(e)}/>

          {product.imageURL === "" ? null : (
            <input type='text'
          //  required 
          placeholder='Image URL'
           name='imageURL' value={product.imageURL} disabled/>
          )}
          
         </Card>

         <label>
        Product price: </label>
        <input type='number' placeholder='Product price' required name='price' value={product.price} onChange={(e)=>handleInputChange(e)} /> 

        <label>Product Category: </label>
        <select required name='category' value={product.category} onChange={(e)=> handleInputChange(e)}>
        <option value="" disabled> -- choose product category --</option>
        {categories.map((cat)=> {
          return(
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          )
        })}

        </select>

        <label>
        Product Company/Brand: </label>
        <input type='text' placeholder='Product brand' required name='brand' value={product.brand} onChange={(e)=>handleInputChange(e)} /> 

        <label>
        Product Description: </label>
        <textarea name='desc' required value={product.desc} onChange={(e)=>handleInputChange(e)} cols='30' rows='10'></textarea>

        <button className='--btn --btn-primary'>Save Product</button>


        </form>
       </Card>
    
    </div>
    </>
  );
  
}

export default AddProducts;