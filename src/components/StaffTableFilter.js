import React from 'react'
import styles from './TableFilter.module.css';

function StaffTableFilter(props) {
  return (
    <div className={styles.filterContainer} >
    <input placeholder='Search id, seller, buyer' onChange={(e) => props.setOrderId(e.target.value)} className={styles.searchInput}/>

    <select name="categories" value={props.orderStatus} onChange={(e) => props.setOrderStatus(e.target.value)}  className={styles.selectBox}>
      <option value="">Order status</option>
<option value="Completed">Completed</option>
<option value="Accepted">Accepted</option>
</select>

<input className={styles.datePicker} onChange={(e) => props.setAcceptedDate(e.target.value)} placeholder='Select' type={"date"}/>

<input className={styles.datePicker} onChange={(e) => props.setCompletedDate(e.target.value)} placeholder='Select' type={"date"}/>

<select name="categories" value={props.totalPrice} onChange={(e) => props.setTotalPrice(e.target.value)} className={styles.selectBox}>
      <option value="">Total price</option>
<option value="500">Below 500</option>
<option value="Electronics">500 - 1000</option>
<option value="Electronics">1500 - 2000</option>
<option value="Electronics">2000 - 2500</option>
<option value="Electronics">2500 - 3000</option>
<option value="Electronics">3500 - 4000</option>
<option value="Electronics">4500 - 5000</option>
<option value="5000">Above 5000</option>
</select>
</div>
  )
}

export default StaffTableFilter