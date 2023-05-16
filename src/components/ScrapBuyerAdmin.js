import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './Table.module.css';
import { scrapBuyerAdminManagement, scrapBuyerAdminList } from '../actions/userAction';
import Flash from './Flash';
import {USER_SCRAPBUYERADMIN_MANAGEMENT_RESET} from '../constants/userConstant';
import AdminTableFilter from './AdminTableFilter';

function ScrapBuyerAdmin() {
  const dispatch = useDispatch()

  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState(false);

  const allScrapBuyerAdmin = useSelector(state => state.scrapBuyerAdminList)
  const {users, loading} = allScrapBuyerAdmin

  const scrapBuyerAdminManagementVar = useSelector(state => state.scrapBuyerAdminManagement)
  const {user} = scrapBuyerAdminManagementVar

  console.log("buyeraddmin", users)

  useEffect(() => {
  if(users.length===0){
    dispatch(scrapBuyerAdminList())
  }

 
    if(Object.keys(user).length!==0){
      if(!user.is_active){
        setVisibility(true)
        setMessage("User account has been deactivated")
        setType("red")
        dispatch({type:USER_SCRAPBUYERADMIN_MANAGEMENT_RESET})
      }else if(user.is_active){
        setVisibility(true)
        setMessage("User account has been activated")
        setType("blue")
        dispatch({type:USER_SCRAPBUYERADMIN_MANAGEMENT_RESET})

      }
      
    }

  }, [user, dispatch, users.length])

  return (

<>
{loading ? (
  <div style={{height:"70vh", display:'flex', justifyContent:"center", alignItems:"center"}}>
  Loading...
  </div>
) : (
  <>
<AdminTableFilter />
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
<Flash visibility={visibility} setVisibility={setVisibility} type={type} message={message}/>
</div>
</>
)}
</>
  )
}

export default ScrapBuyerAdmin