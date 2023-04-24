import InfoBox from '../components/InfoBox'
import StatChart from '../components/StatChart'
import Table from 'react-bootstrap/Table';
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllStatInfo, listOrders } from '../actions/orderActions';
import styles from './HomeScreen.module.css';
import { useNavigate } from 'react-router-dom';


function HomeScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const statInformation = useSelector(state => state.statInfo)
  const {stat} = statInformation

  const allCompletedOrderList = useSelector(state => state.orderList)
  const {orders} = allCompletedOrderList

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  useEffect(() => {
    
    if(Object.keys(userInfo).length===0){
        navigate("/signin")
    }
}, [userInfo])

  useEffect(() => {
    dispatch(getAllStatInfo())
    dispatch(listOrders())

  }, [])

  
  return (


    <div className={styles.homeContainer}>
      <div className={styles.homeChild}>
      <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>

      </div>
      <div className={styles.homeChild}>
      <InfoBox head={"Orders in last 7 days"} data={stat.totalOrdersInLastSevenDays}/>

      </div>
      <div className={styles.homeChild}>
      <InfoBox head={"Total Users"} data={stat.totalUsers}/>

      </div>
      <div className={styles.homeChild}>

      <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>

      </div>
      <div className={styles.homeChild}>
      <StatChart />

      </div>
      <div className={styles.homeChild}>
      <StatChart />

      </div>
      
    </div>

  )
}

export default HomeScreen

        {/*<div style={{backgroundColor:"white", padding:30, borderRadius:20}}>
          <h1>Orders</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>id</th>
          <th>Items</th>
          <th>Seller</th>
          <th>Buyer</th>
          <th>Accepted date</th>
          <th>Order status</th>
          <th>Completed by</th>
          <th>Completed date</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr>
          <td>{index+1}</td>
          <td>{order.id}</td>
          <td>
          {order.sellRequest.data.map((x, index) => (
            <>{x.itemName} | </>

          ))}
          </td>
          
          <td>{order.sellRequest.requestedUser.first_name}</td>
          <td>{order.acceptedUser}</td>
          <td>{order.acceptedDate}</td>
          <td>{order.requestStatus}</td>
          <td>{order.completedUser}</td>
          <td>{order.completedDate}</td>
          <td>Rs {order.totalPrice}</td>
        </tr>

        ))}
        
        
      </tbody>
    </Table>

        </div>
==============================
        <div>
            <StatChart />
            <StatChart />

        </div>
        =======================
            <InfoBox head={"Total Orders"} data={stat.totalOrders}/>
        <InfoBox head={"Orders in last 7 days"} data={stat.totalOrdersInLastSevenDays}/>
        <InfoBox head={"Total Users"} data={stat.totalUsers}/>
        <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>

        <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>
        <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>
        <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>
        <InfoBox head={"Users in last 7 days"} data={stat.totalUsersInlastSevenDays}/>
        */}