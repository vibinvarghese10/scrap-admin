import React from 'react'
import styles from './TableFilter.module.css';


function SellRequestTableFilter(props) {
  return (
    <div className={styles.filterContainer} >
    <input placeholder='Search id, seller' onChange={(e) => props.setRequestId(e.target.value)} className={styles.searchInput}/>

    <select name="categories" value={props.requestStatus} onChange={(e) => props.setRequestStatus(e.target.value)}  className={styles.selectBox}>
      <option value="">Order status</option>
<option value="Completed">Completed</option>
<option value="Accepted">Accepted</option>
</select>

<input className={styles.datePicker} placeholder='Requested date' onChange={(e) => props.setRequestDate(e.target.value)} type={"date"}/>
</div>
  )
}

export default SellRequestTableFilter