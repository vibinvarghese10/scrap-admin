import React, {useEffect, useState} from 'react'
import styles from './Categories.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { listCategories } from '../actions/itemAction';
import { addCategory, updateCategory, deleteCategory } from '../actions/itemAction';

function Categories() {
  const dispatch = useDispatch()

  const [addStatus, setAddStatus] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState(null)

  const [categoryAddInput, setCategoryAddInput] = useState("")
  const [categoryUpdateInput, setCategoryUpdateInput] = useState("")
  const [categoryDeleteInput, setCategoryDeleteInput] = useState("")



  const {categories, loading} = useSelector(state => state.categoryList)


  const categoryAddHandler = () => {
    dispatch(addCategory({"categoryName":categoryAddInput}))
    setCategoryAddInput("")
  }

  const categoryUpdateHandler = () => {
    dispatch(updateCategory({"categoryName":categoryUpdateInput, "categoryId":updateStatus.id}))
    setCategoryUpdateInput("")
    setUpdateStatus(null)
  }

  const categoryDeleteHandler = () => {
    dispatch(deleteCategory(deleteStatus.id))
    setCategoryDeleteInput("")
  }

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
      <h1 onClick={() => (setAddStatus(true), setUpdateStatus(null), setDeleteStatus(null))}>Add</h1>

     )}
     
    
     </div>

     {addStatus && (
      <div className={styles.addInputContainer}>
       <input type={"text"} onChange={(e) => setCategoryAddInput(e.target.value)} value={categoryAddInput} placeholder='category'/>
       <button disabled={!categoryAddInput} onClick={() => categoryAddHandler()}><h1>Add</h1></button>
     </div>
     )
    }
     
     <div className={styles.categoryBody}>
       {categories.map((category, index) => (
          <>
          {updateStatus && updateStatus.id===category.id ? (
            <div className={styles.updateInputContainer}>
            <input type={"text"} value={categoryUpdateInput} onChange={(e) => setCategoryUpdateInput(e.target.value)} placeholder='category'/>
            <button onClick={() => categoryUpdateHandler()} ><i className="fa fa-check fa-1x"></i></button>
            <div onClick={() => setUpdateStatus(null)}>
            <i className="fa fa-close fa-1x"></i>
            </div>
          </div>
          ) : deleteStatus && deleteStatus.id===category.id ? (
            /* Delete  Area */
            <div className={styles.deleteInputContainer}>
            <input type={"text"} onChange={(e) => setCategoryDeleteInput(e.target.value)} placeholder={'type "'+category.categoryName +'"'}/>
            <button disabled={categoryDeleteInput===deleteStatus.categoryName ? false : true} onClick={() => categoryDeleteHandler()}><i className="fa fa-trash fa-1x"></i></button>
            <div onClick={() => setDeleteStatus(null)}>
            <i className="fa fa-close fa-1x"></i>
            </div>
            </div>

          ): (
            
            <div key={index} className={styles.categoryItem}>
            <p>{category.categoryName}</p>
            <div className={styles.btnContainers}>
            <i onClick={() => (setUpdateStatus(category), setAddStatus(false), setDeleteStatus(null), setCategoryUpdateInput(category.categoryName))} className="fa fa-edit fa-1x"></i>
            <i onClick={() => (setDeleteStatus(category), setAddStatus(false), setUpdateStatus(null))} className="fa fa-trash fa-1x"></i>
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