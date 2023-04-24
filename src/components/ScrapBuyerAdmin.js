import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  scrapBuyerAdminList } from '../actions/userAction';
import styles from './Table.module.css';
import { scrapBuyerAdminManagement } from '../actions/userAction';

function ScrapBuyerAdmin() {
  const dispatch = useDispatch()

  const allScrapBuyerAdmin = useSelector(state => state.scrapBuyerAdminList)
  const {users} = allScrapBuyerAdmin

  console.log("buyeraddmin", users)

  useEffect(() => {
    dispatch( scrapBuyerAdminList())

  }, [])
  return (

<div className={styles.tableContainer}>
<table>

<tr>
        <th>#</th>
        <th>id</th>
        <th>Username</th>
        <th>Name</th>
        <th>Date joined</th>
        <th>Account status</th>
        <th>Scrap Business Name</th>
        <th>Staffs</th>
        <th>Accepted orders</th>
        <th>Completed orders</th>
        <th></th>
      </tr>


      {users.map((user, index) => (
          <tr>
          <td>{index+1}</td>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.first_name}</td>
          <td>{user.date_joined.slice(0, 10)}</td>
          <td>{user.is_active ? "Active" : "Not active"}</td>
          <td>{user.profileInfo.businessName}</td>
          <td>{user.staffs}</td>
          <td>{user.acceptedOrders}</td>
          <td>{user.completedOrders}</td>
          <td><button onClick={() => dispatch(scrapBuyerAdminManagement(user.id))} className={user.is_active ? styles.redBtn : styles.blueBtn}>{user.is_active ? "Deactivate" : "Activate"}</button></td>
        </tr>

      ))}



</table>
</div>
  )
}

export default ScrapBuyerAdmin