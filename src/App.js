
import {
      BrowserRouter as Router,
      Routes,
      Route,
  } from 'react-router-dom';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import HomeScreen from './screens/HomeScreen';
  import OrdersScreen from './screens/OrdersScreen';
  import UsersScreen from './screens/UsersScreen';
  import ItemsScreen from './screens/ItemsScreen';
  import SigninScreen from './screens/SigninScreen';
  import GridScreen from './screens/GridScreen';
  import React, { useEffect } from 'react';
  import { useDispatch } from 'react-redux';
  import { USER_LOGIN_SUCCESS } from './constants/userConstant';
  import jwtDecode from 'jwt-decode';
  import './App.css';
  import { logout } from './actions/userAction';


  function App() {
    const dispatch = useDispatch()

    //const userInformation = useSelector(state => state.userLogin)
    //const {userInfo} = userInformation

    useEffect(() => {
      const userInfoFromStorage = async ()  => {
        try {
        const storedData = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
        
        if (storedData !== null){
          if (jwtDecode(storedData.access).exp < Date.now() / 1000) {
            dispatch(logout())
          } else {
            dispatch({type:USER_LOGIN_SUCCESS, payload:storedData})
          }
        
       }
        } catch (error) {
       console.log(error);
       }
      }

      userInfoFromStorage()
    
  
      }, [dispatch])
  
    

  return (
    <Router>
      <Header />

    <div  className="container">
    <Routes>
     <Route path='/' exact element={<HomeScreen />} />
      <Route path='/orders' exact element={<OrdersScreen />} />
      <Route path='/users' exact element={<UsersScreen />} />
      <Route path='/items' exact element={<ItemsScreen />} />
      <Route path='/grid' exact element={<GridScreen />} />
      <Route path='/signin' exact element={<SigninScreen />} />
    </Routes>
    </div>
      
 

    <Footer />
    </Router>
  );
}

export default App;
