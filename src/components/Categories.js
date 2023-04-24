import React from 'react'
import Button from 'react-bootstrap/Button';
import styles from './Categories.module.css';

function Categories() {
  return (

    <div className={styles.categoryContainer}>
      <div className={styles.categoryHeader}>
 
     <p>Categories</p>
    
     </div>
     <div className={styles.categoryBody}>
       <div className={styles.categoryItem}>
         <p>Plastic</p>
         <p>Plastic</p>
       </div>

       <div className={styles.categoryItem}>
         <p>Plastic</p>
         <p>Plastic</p>
       </div>

       <div className={styles.categoryItem}>
         <p>Plastic</p>
         <p>Plastic</p>
       </div>



      

     </div>
     <div className={styles.categoryFooter}>
       <button>Add category</button>

     </div>
   
       

     </div>

 
  )
}

export default Categories