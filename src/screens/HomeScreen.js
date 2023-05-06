import InfoBox from '../components/InfoBox'
import StatChart from '../components/StatChart'
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

  //const allCompletedOrderList = useSelector(state => state.orderList)
  //const {orders} = allCompletedOrderList

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  useEffect(() => {
    
    if(Object.keys(userInfo).length===0){
        navigate("/signin")
    }
}, [userInfo, navigate])

  useEffect(() => {
    dispatch(getAllStatInfo())
    dispatch(listOrders())

  }, [dispatch])

  
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

       