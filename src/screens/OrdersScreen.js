import React, {useState, useEffect} from 'react'
import OrderTable from '../components/OrderTable';
import SellRequestsTable from '../components/SellRequestsTable';
import styles from './OrdersScreen.module.css';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';



function OrdersScreen() {
  const [tab, setTab] = useState("Orders")

  const navigate = useNavigate();

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  useEffect(() => {
    
    if(Object.keys(userInfo).length===0){
        navigate("/signin")
    }
}, [userInfo])


  return (
    <div className={styles.tabContainer}>
<div className={styles.tabColumn, styles.item}  onClick={() => setTab("Orders")} style={tab==="Orders" ? {borderBottomWidth: "6.5px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"} : undefined}>
  <p className={styles.tabTitle}>Orders</p>

  </div>
  
  <div className={styles.tabColumn, styles.item} onClick={() => setTab("Sell requests")} style={tab==="Sell requests" ? {borderBottomWidth: "6.5px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"} : undefined}>
  <p className={styles.tabTitle}>Sell requests</p>
  </div>



  <div className={styles.tabColumn} style={{overflowX:"auto"}}> {tab==="Orders" ? <OrderTable /> : <SellRequestsTable />}</div>

</div>
  );

}

export default OrdersScreen