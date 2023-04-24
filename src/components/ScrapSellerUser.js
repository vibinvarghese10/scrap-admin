import React, {useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import {  scrapSellerList } from '../actions/userAction';
import styles from './Table.module.css';
import { scrapSellerManagement } from '../actions/userAction';

function ScrapSellerUser() {

  const dispatch = useDispatch()

  const allScrapSeller = useSelector(state => state.scrapSellerList)
  const {users} = allScrapSeller

  console.log("seller", users)

  useEffect(() => {
    dispatch( scrapSellerList())

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
        <th>Sell request</th>
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
        <td>{user.sellRequests}</td>
        <td><button onClick={() => dispatch(scrapSellerManagement(user.id))} className={user.is_active ? styles.redBtn : styles.blueBtn}>{user.is_active ? "Deactivate" : "Activate"}</button></td>
      </tr>

      ))}



</table>
</div>
  )
}

export default ScrapSellerUser