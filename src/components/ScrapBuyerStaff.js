import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  scrapBuyerStaffList } from '../actions/userAction';
import styles from './Table.module.css';
import { scrapBuyerStaffManagement } from '../actions/userAction';
import Flash from './Flash';
import { USER_SCRAPBUYERSTAFF_MANAGEMENT_RESET } from '../constants/userConstant';
import StaffTableFilter from './StaffTableFilter';

function ScrapBuyerStaff() {
  const dispatch = useDispatch()

  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState(false);

  const allScrapBuyerStaff = useSelector(state => state.scrapBuyerStaffList)
  const {users} = allScrapBuyerStaff

  const scrapBuyerStaffManagementVar = useSelector(state => state.scrapBuyerStaffManagement)
  const {user} = scrapBuyerStaffManagementVar

  console.log("buyerstaff", users)

  useEffect(() => {
    if(users.length===0){
    dispatch( scrapBuyerStaffList())
    }

     
    if(Object.keys(user).length!==0){
      if(!user.is_active){
        setVisibility(true)
        setMessage("User account has been deactivated")
        setType("red")
        dispatch({type:USER_SCRAPBUYERSTAFF_MANAGEMENT_RESET})
      }else if(user.is_active){
        setVisibility(true)
        setMessage("User account has been activated")
        setType("blue")
        dispatch({type:USER_SCRAPBUYERSTAFF_MANAGEMENT_RESET})

      }
      
    }

  }, [user, dispatch])

  return (
<><StaffTableFilter />
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
<Flash visibility={visibility} setVisibility={setVisibility} type={type} message={message}/>
</div>
</>
  )
}

export default ScrapBuyerStaff