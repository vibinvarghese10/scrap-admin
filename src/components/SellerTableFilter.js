import React from 'react'
import styles from './TableFilter.module.css';



function SellerTableFilter(props) {
  return (
    <div className={styles.filterContainer} >
    <input placeholder='Search id, username, name' onChange={(e) => props.setUserId(e.target.value)} className={styles.searchInput}/>

    <select name="categories" value={props.accountStatus} onChange={(e) => props.setAccountStatus(e.target.value)}  className={styles.selectBox}>
      <option value="">Account status</option>
<option value={true}>Active</option>
<option value={false}>Not Active</option>
</select>

<input className={styles.datePicker} onChange={(e) => props.setJoinedDate(e.target.value)} type={"date"}/>


</div>
  )
}

export default SellerTableFilter