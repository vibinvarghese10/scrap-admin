import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { listSellRequest } from '../actions/orderActions';
import styles from './Table.module.css';
import { sellRequestManagement } from '../actions/orderActions';
import Flash from './Flash';
import {SELLREQUEST_MANAGEMENT_FAIL, SELLREQUEST_MANAGEMENT_RESET} from '../constants/orderConstant';
import FilterButton from './FilterButton';

function SellRequestsTable() {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState(false);
  const dispatch = useDispatch()

  const allSellRequestList = useSelector(state => state.sellRequestList)
  const {sellRequests} = allSellRequestList

  const sellReqManagement = useSelector(state => state.sellRequestManagement)
  const {sellRequest} = sellReqManagement

  console.log("sellreq", sellRequests)


  useEffect(() => {
    if(sellRequests.length===0){
      dispatch(listSellRequest())
    }

    if(Object.keys(sellRequest).length!==0){
      if(sellRequest.requestStatus==="Disabled"){
        setVisibility(true)
        setMessage("Sell request disabled successfully")
        setType("red")
        dispatch({type:SELLREQUEST_MANAGEMENT_RESET})
      }else if(sellRequest.requestStatus==="Requested" || sellRequest.requestStatus==="Accepted"){
        setVisibility(true)
        setMessage("Sell request enabled successfully")
        setType("blue")
        dispatch({type:SELLREQUEST_MANAGEMENT_RESET})

      }
      
    }

  }, [sellRequest])


  return (


<div className={styles.tableContainer}>
<table>


<tr>
       <th></th>
          <th>id</th>
          <th>Items</th>
          <th>Seller</th>
          <th>Requested date</th>
          <th>Request status</th>
          <th></th>
</tr>


{sellRequests.map((sellreq, index) => (
           <tr key={index}>
           <td>{index+1}</td>
           <td>{sellreq.id}</td>
           <td>
          {sellreq.data.map((x, index) => (
            <>{x.itemName} | </>

          ))}
          </td>
           <td>{sellreq.requestedUser.first_name}</td>
           <td>{sellreq.requestedDate}</td>
           <td>{sellreq.requestStatus}</td>
           <td>{sellreq.requestStatus==="Accepted" || sellreq.requestStatus==="Requested" || sellreq.requestStatus==="Disabled" ? <button onClick={() => dispatch(sellRequestManagement(sellreq.id))} className={sellreq.requestStatus==="Disabled" ? styles.blueBtn: styles.redBtn}>{sellreq.requestStatus==="Disabled" ? "Enable" : "Disable"}</button> : ""}</td>
         </tr>

        ))}



</table>
<Flash visibility={visibility} setVisibility={setVisibility} type={type} message={message}/>
<FilterButton />


</div>
  )
}

export default SellRequestsTable