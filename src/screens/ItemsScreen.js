import React, {useEffect} from 'react'
import ItemTable from '../components/ItemTable'
import Categories from '../components/Categories';
import styles from './ItemsScreen.module.css';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';


function ItemsScreen() {
  const navigate = useNavigate();

  const userLoginInfo = useSelector(state => state.userLogin)
  const {userInfo} = userLoginInfo

  useEffect(() => {
    
    if(Object.keys(userInfo).length===0){
        navigate("/signin")
    }
}, [userInfo, navigate])

  



  return (
    <div className={styles.container}>
      <div className={styles.cateCont}>
        <Categories />

      </div>
      <div className={styles.itemCont}>
        <ItemTable />
      
      </div>
   </div>
  )
}

export default ItemsScreen