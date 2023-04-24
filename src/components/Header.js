import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../actions/userAction';
import styles from './Header.module.css';
import MenuModal from '../modal/MenuModal';
import { useDispatch, useSelector } from 'react-redux';


function Header() {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <h5>ScrapDeal</h5>

      </div>
      <div className={styles.headerRight}>
        {Object.keys(userInfo).length!==0 && (
          <>
                 <Link to={'/'} className={styles.routerLink}>Dashboard</Link>
                 <Link to={'/items'} className={styles.routerLink}>Items</Link>
                 <Link to={'/orders'} className={styles.routerLink}>Orders</Link>
                 <Link to={'/users'} className={styles.routerLink}>Users</Link>
         
                 
                
                 <div className={styles.dropdown}>
           <div className={styles.dropbtn}>Settings <i class="fa fa-caret-down"></i></div>
           <div className={styles.dropdownContent}>
           <div onClick={() => logoutHandler()}>Logout</div>
           </div>
         </div>
         </>      
        )}
 

     </div>
     <div className={styles.headerMobileRight} onClick={() => setModalOpen(true)}>
        <i className="fa fa-bars fa-2x"></i>
     </div>
 

    </div>
    <MenuModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </>

  )
}

export default Header

/*
        <div className={styles.dropdown}>
  <div className={styles.dropbtn}>Settings</div>
  <div className={styles.dropdownContent}>
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
*/