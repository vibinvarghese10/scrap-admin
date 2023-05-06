import React, {useState, useEffect} from 'react'
import ScrapSellerUser from '../components/ScrapSellerUser';
import ScrapBuyerAdmin from '../components/ScrapBuyerAdmin';
import ScrapBuyerStaff from '../components/ScrapBuyerStaff';
import styles from './UsersScreen.module.css';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';



function UsersScreen() {
  const [tab, setTab] = useState("Scrap seller")

  const navigate = useNavigate();

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  useEffect(() => {
    
    if(Object.keys(userInfo).length===0){
        navigate("/signin")
    }
}, [userInfo, navigate])
  
  return (
    <div className={styles.tabContainer}>
    <div className={`${styles.tabColumn} ${styles.item}`}  onClick={() => setTab("Scrap seller")} style={tab==="Scrap seller" ? {borderBottomWidth: "6.5px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"} : undefined}>
      <p className={styles.tabTitle}>Seller</p>
    
      </div>
      
      <div className={`${styles.tabColumn} ${styles.item}`} onClick={() => setTab("Scrap buyer admin")} style={tab==="Scrap buyer admin" ? {borderBottomWidth: "6.5px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"} : undefined}>
      <p className={styles.tabTitle}>Buyer</p>
      </div>

      <div className={`${styles.tabColumn} ${styles.item}`} onClick={() => setTab("Scrap buyer staff")} style={tab==="Scrap buyer staff" ? {borderBottomWidth: "6.5px", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px"} : undefined}>
      <p className={styles.tabTitle}>Staff</p>
      </div>
    
      <div className={styles.tabColumn} style={{overflowX:"auto"}}> {tab==="Scrap seller" ? <ScrapSellerUser /> : tab==="Scrap buyer admin" ? <ScrapBuyerAdmin /> : <ScrapBuyerStaff />}</div>
    </div>
  )
}

export default UsersScreen