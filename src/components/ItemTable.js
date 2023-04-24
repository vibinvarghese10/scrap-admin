import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { useFetcher } from 'react-router-dom';
import { listItems, updateItem } from '../actions/itemAction';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ItemModal from '../modal/ItemModal';
import { ITEM_LIST_FAIL } from '../constants/itemConstant';
import styles from './ItemTable.module.css';
import { filterItem } from '../actions/itemAction';



function ItemTable(props) {
    const dispatch = useDispatch()

    const [categoryToFilter, setCategoryToFilter] = useState("");

    const {items:filterItems} = useSelector(state => state.itemFilter)

    const {items, loading} = useSelector(state => state.itemList)
    console.log("items", items)

    console.log("filterItems", filterItems)

   
    

      useEffect(() => {
      dispatch(listItems())

    }, [])


    useEffect(() => {
      if(categoryToFilter){
      dispatch(filterItem(categoryToFilter))
      }
    }, [categoryToFilter])

  
    


  

  return (
      <>
      {loading ? (
            <div>
            <Spinner animation="border" />
            </div>
         
        ) : (
          <>
          <div className={styles.tableHeader}>
          <h3>Items</h3>

          <div>
          <select name="categories" value={categoryToFilter} onChange={(e) => setCategoryToFilter(e.target.value)} >
          <option value="">---------</option>
  <option value="Paper">Paper</option>
  <option value="Electronics">Electronics</option>
</select>
          </div>

          </div>
          
          <div className={styles.tableContainer}>
          <table >

        <tr>
          <th></th>
          <th>Name</th>
          <th>Rate</th>
          <th>Category</th>
          <th>Unit</th>
          <th></th>
          <th></th>
        </tr>
   
   
      {!categoryToFilter ? (
        items.map((item, index) => (
          <tr>
    <td>{index+1}</td>
    <td>{item.itemName}</td>
    <td>₹ {item.rate}</td>
    <td>{item.category.categoryName}</td>
    <td>{item.unit}</td>
    <td><button type='button' className={styles.edtBtn}>Edit</button></td>
    <td><button type='button' className={styles.dltBtn}>Delete</button></td>

  </tr>))

      ) : (
        filterItems.map((item, index) => (
          <tr>
    <td>{index+1}</td>
    <td>{item.itemName}</td>
    <td>₹ {item.rate}</td>
    <td>{item.category.categoryName}</td>
    <td>{item.unit}</td>
    <td><button type='button' className={styles.edtBtn}>Edit</button></td>
    <td><button type='button' className={styles.dltBtn}>Delete</button></td>

  </tr>))

      )}




    </table>
    </div>
   
            
     
         
          </>
 
  )}

   </>
  )
}

export default ItemTable