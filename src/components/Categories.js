import React, {useEffect, useState} from 'react'
import styles from './Categories.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from '../actions/itemAction';

function Categories() {
  const dispatch = useDispatch()
  const [addStatus, setAddStatus] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState(null)

  const [categoryInput, setCategoryInput] = useState("")

  const {categories, loading} = useSelector(state => state.categoryList)

  useEffect(() => {

    dispatch(listCategories())
  }, [])
  return (

    <div className={styles.categoryContainer}>
      <div className={styles.categoryHeader}>
 
     <p>Categories</p>
     {addStatus ? (
       <h1 onClick={() => setAddStatus(false)}>Close</h1>
       
     ) : (
      <h1 onClick={() => (setAddStatus(true), setUpdateStatus(null), setDeleteStatus(null), setCategoryInput(""))}>Add</h1>

     )}
     
    
     </div>

     {addStatus && (
      <div className={styles.addInputContainer}>
       <input type={"text"} onChange={(e) => setCategoryInput(e.target.value)} placeholder='category'/>
       <button ><h1>Add</h1></button>
     </div>
     )
    }
     
     <div className={styles.categoryBody}>
       {categories.map((category, index) => (
          <>
          {updateStatus && updateStatus===category.id ? (
            <div className={styles.updateInputContainer}>
            <input type={"text"} value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} placeholder='category'/>
            <button ><i className="fa fa-check fa-1x"></i></button>
            <div onClick={() => setUpdateStatus(null)}>
            <i className="fa fa-close fa-1x"></i>
            </div>
          </div>
          ) : deleteStatus && deleteStatus===category.id ? (
            <div className={styles.deleteInputContainer}>
            <input type={"text"} placeholder={'type "'+category.categoryName +'"'}/>
            <button disabled ><i className="fa fa-trash fa-1x"></i></button>
            <div onClick={() => setDeleteStatus(null)}>
            <i className="fa fa-close fa-1x"></i>
            </div>
          </div>

          ): (
            <div key={index} className={styles.categoryItem}>
            <p>{category.categoryName}</p>
            <div className={styles.btnContainers}>
            <i onClick={() => (setUpdateStatus(category.id), setAddStatus(false), setDeleteStatus(null), setCategoryInput(category.categoryName))} className="fa fa-edit fa-1x"></i>
            <i onClick={() => (setDeleteStatus(category.id), setAddStatus(false), setUpdateStatus(null))} className="fa fa-trash fa-1x"></i>
            </div>
            </div>
          )}
          </>
        
       ))}
      
     </div>
     </div>

 
  )
}

export default Categories