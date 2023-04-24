import React, {useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import {  scrapBuyerStaffList } from '../actions/userAction';
import styles from './Table.module.css';
import { scrapBuyerStaffManagement } from '../actions/userAction';

function ScrapBuyerStaff() {
  const dispatch = useDispatch()

  const allScrapBuyerStaff = useSelector(state => state.scrapBuyerStaffList)
  const {users} = allScrapBuyerStaff

  console.log("buyerstaff", users)

  useEffect(() => {
    dispatch( scrapBuyerStaffList())

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
        <th>Owner</th>
        <th></th>
      </tr>


      {users.map((user, index) => (
        <tr key={index}>
        <td>{index+1}</td>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.first_name}</td>
        <td>{user.date_joined.slice(0, 10)}</td>
        <td>{user.is_active ? "Active" : "Not active"}</td>
        <td>{user.staffProfile.staffOf.first_name}</td>
        <td><button onClick={() => dispatch(scrapBuyerStaffManagement(user.id))} className={user.is_active ? styles.redBtn : styles.blueBtn}>{user.is_active ? "Deactivate" : "Activate"}</button></td>
      </tr>

      ))}



</table>
</div>
  )
}

export default ScrapBuyerStaff