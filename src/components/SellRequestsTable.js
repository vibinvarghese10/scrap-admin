import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listSellRequest } from '../actions/orderActions';
import styles from './Table.module.css';
import { sellRequestManagement } from '../actions/orderActions';
import Flash from './Flash';
import {SELLREQUEST_MANAGEMENT_RESET} from '../constants/orderConstant';
import SellRequestTableFilter from './SellRequestTableFilter';
import { filterSellrequestList } from '../actions/orderActions';
import {SELLREQUEST_FILTER_RESET} from '../constants/orderConstant';


function SellRequestsTable() {
  const dispatch = useDispatch()

  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");
  let [type, setType] = useState(false);

  const [requestStatus, setRequestStatus] = useState("")
  const [requestId, setRequestId] = useState(null)
  const [requestDate, setRequestDate] = useState(null)

  const allSellRequestList = useSelector(state => state.sellRequestList)
  const {sellRequests} = allSellRequestList

  const {filteredSellRequests} = useSelector(state => state.sellrequestFilter)
  console.log("filtered data", filteredSellRequests)

  const sellReqManagement = useSelector(state => state.sellRequestManagement)
  const {sellRequest} = sellReqManagement


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


  useEffect(() => {

    dispatch(filterSellrequestList(requestStatus, requestId, requestDate))

    if(!requestDate && !requestId && !requestStatus){
      dispatch({type:SELLREQUEST_FILTER_RESET})
    }


  }, [requestStatus, requestId, requestDate, dispatch])


  return (
<>
<SellRequestTableFilter requestId={requestId} setRequestId={setRequestId} requestStatus={requestStatus} setRequestStatus={setRequestStatus} requestDate={requestDate} setRequestDate={setRequestDate}/>
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


{requestStatus || requestId || requestDate ?  (filteredSellRequests.map((sellreq, index) => (
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

        ))) : (

          sellRequests.map((sellreq, index) => (
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
          ))

        )}



</table>
<Flash visibility={visibility} setVisibility={setVisibility} type={type} message={message}/>
</div>
</>
  )
}

export default SellRequestsTable