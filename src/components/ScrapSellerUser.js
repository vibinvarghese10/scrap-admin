import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  scrapSellerList } from '../actions/userAction';
import styles from './Table.module.css';
import { scrapSellerManagement } from '../actions/userAction';
import { USER_SCRAPSELLER_FILTER_RESET, USER_SCRAPSELLER_MANAGEMENT_RESET } from '../constants/userConstant';
import Flash from './Flash';
import SellerTableFilter from './SellerTableFilter';
import { filterScrapSellerList } from '../actions/userAction';

function ScrapSellerUser() {

  const dispatch = useDispatch()

  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState(false);

  const [accountStatus, setAccountStatus] = useState(null)
  const [userId, setUserId] = useState(null)
  const [joinedDate, setJoinedDate] = useState(null)

  console.log("status", accountStatus)

  const allScrapSeller = useSelector(state => state.scrapSellerList)
  const {users} = allScrapSeller

  const scrapSellerManagementVar = useSelector(state => state.scrapSellerManagement)
  const {user} = scrapSellerManagementVar

  const {filteredUsers} = useSelector(state => state.scrapSellerFilter)

  console.log("seller", filteredUsers)

  useEffect(() => {
    if(users.length === 0){
    dispatch( scrapSellerList())
    }

    if(Object.keys(user).length!==0){
      if(!user.is_active){
        setVisibility(true)
        setMessage("User account has been deactivated")
        setType("red")
        dispatch({type:USER_SCRAPSELLER_MANAGEMENT_RESET})
      }else if(user.is_active){
        setVisibility(true)
        setMessage("User account has been activated")
        setType("blue")
        dispatch({type:USER_SCRAPSELLER_MANAGEMENT_RESET})

      }
      
    }

  }, [user, dispatch, users.length])

  useEffect(() => {

    dispatch(filterScrapSellerList(accountStatus, userId, joinedDate))

    if(!accountStatus && !userId && !joinedDate){
      dispatch({type:USER_SCRAPSELLER_FILTER_RESET})
    }


  }, [accountStatus, userId, joinedDate, dispatch])
  return (
<>
<SellerTableFilter setJoinedDate={setJoinedDate} setUserId={setUserId} accountStatus={accountStatus} setAccountStatus={setAccountStatus}/>
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

      {accountStatus || userId || joinedDate ? (
        filteredUsers.map((user, index) => (
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

      ))) : (
        users.map((user, index) => (
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
  
        ))
        

      )}



</table>
<Flash visibility={visibility} setVisibility={setVisibility} type={type} message={message}/>
</div>
</>
  )
}

export default ScrapSellerUser