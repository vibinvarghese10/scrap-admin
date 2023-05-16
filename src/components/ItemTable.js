import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listItems } from '../actions/itemAction';
import ItemModal from '../modal/ItemModal';
import styles from './ItemTable.module.css';
import { filterItem } from '../actions/itemAction';



function ItemTable(props) {
    const dispatch = useDispatch()

    const [itemModalStatus, setItemModalStatus] = useState(false);
    const [itemModalType, setItemModalType] = useState("");
    const [selectedItem, setSelectedItem] = useState({});

    const [categoryToFilter, setCategoryToFilter] = useState("");

    const {items:filterItems} = useSelector(state => state.itemFilter)

    const {items, loading} = useSelector(state => state.itemList)


    useEffect(() => {
      if(items.length===0){
      dispatch(listItems())
      }
      if(categoryToFilter){
      dispatch(filterItem(categoryToFilter))
      }
    }, [categoryToFilter, dispatch, items.length])


    const editBtnHandler = (item) => {
      setItemModalStatus(true)
      setItemModalType("Update")
      setSelectedItem(item)
    }

    const addBtnHandler = () => {
      setItemModalStatus(true)
      setItemModalType("Create")
    }

    const dltBtnHandler = (item) => {
      setItemModalStatus(true)
      setItemModalType("Delete")
      setSelectedItem(item)
    }

  return (
      <>
      {loading ? (
            <div style={{height:"70vh", display:'flex', justifyContent:"center", alignItems:"center"}}>
            Loading...
            </div>
         
        ) : (
          <>
          <div className={styles.tableHeader}>
          <h3>Items</h3>
          

          <div className={styles.tableHeaderRight}>
          <button onClick={() => addBtnHandler()}><h1>Add item</h1></button>
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
          <tr key={index}>
    <td>{index+1}</td>
    <td>{item.itemName}</td>
    <td>₹ {item.rate}</td>
    <td>{item?.category?.categoryName}</td>
    <td>{item.unit}</td>
    <td><button onClick={() => editBtnHandler(item)} type='button' className={styles.edtBtn}>Edit</button></td>
    <td><button onClick={() => dltBtnHandler(item)} type='button' className={styles.dltBtn}>Delete</button></td>
  </tr>))
      ) : (
        filterItems.map((item, index) => (
          <tr key={index}>
    <td>{index+1}</td>
    <td>{item.itemName}</td>
    <td>₹ {item.rate}</td>
    <td>{item?.category?.categoryName}</td>
    <td>{item.unit}</td>
    <td><button onClick={() =>  editBtnHandler(item)} type='button' className={styles.edtBtn}>Edit</button></td>
    <td><button onClick={() => dltBtnHandler(item)} type='button' className={styles.dltBtn}>Delete</button></td>
  </tr>))
      )}
    </table>
    </div>
    <ItemModal itemModalStatus={itemModalStatus} setItemModalStatus={setItemModalStatus} itemModalType={itemModalType} item={selectedItem} setSelectedItem={setSelectedItem}/>
          </>
  )}
   </>
  )
}

export default ItemTable