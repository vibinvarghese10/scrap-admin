import InfoBox from '../components/InfoBox'
import StatChart from '../components/StatChart'
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllStatInfo, listOrders, chartStatDataCaller } from '../actions/orderActions';
import styles from './HomeScreen.module.css';
import { useNavigate } from 'react-router-dom';


function HomeScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const statInformation = useSelector(state => state.statInfo)
  const {stat} = statInformation

  const statChartInformation = useSelector(state => state.statChartInfo)
  const {chartData} = statChartInformation

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  useEffect(() => {
    
    if(Object.keys(userInfo).length===0){
        navigate("/signin")
    }
}, [userInfo, navigate])

  useEffect(() => {
    if(Object.keys(userInfo).length!==0){
      if(Object.keys(stat).length===0){
    dispatch(getAllStatInfo())
      }

    if(Object.keys(chartData.order).length===0 && Object.keys(chartData.user).length===0){
    dispatch(chartStatDataCaller())
    }

  }
  }, [dispatch, userInfo, stat, chartData])

  
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

      <InfoBox head={"Total Orders"} data={stat.totalOrders}/>

      </div>

      <div className={styles.homeChild}>
         <StatChart chartDataToRender={chartData.user} label="Users"/>

      </div>

      <div className={styles.homeChild}>
      <StatChart chartDataToRender={chartData.order} label="Orders"/>

      </div>

      
    </div>

  )
}

export default HomeScreen

/*
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

      <InfoBox head={"Users in last 7 days"} data={stat.totalOrders}/>

      </div>
      <div className={styles.homeChild}>
      <StatChart />

      </div>
      <div className={styles.homeChild}>
      <StatChart />

      </div>

      
    </div>
    */

       