import { USER_SCRAPBUYERADMIN_LIST_REQUEST,
    USER_SCRAPBUYERADMIN_LIST_SUCCESS,
    USER_SCRAPBUYERADMIN_LIST_FAIL,
    USER_SCRAPBUYERSTAFF_LIST_FAIL,
    USER_SCRAPBUYERSTAFF_LIST_SUCCESS,
    USER_SCRAPBUYERSTAFF_LIST_REQUEST,
    USER_SCRAPSELLER_LIST_REQUEST,
    USER_SCRAPSELLER_LIST_SUCCESS,
    USER_SCRAPSELLER_LIST_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_SCRAPSELLER_MANAGEMENT_REQUEST,
USER_SCRAPSELLER_MANAGEMENT_SUCCESS,
USER_SCRAPSELLER_MANAGEMENT_FAIL,
USER_SCRAPBUYERADMIN_MANAGEMENT_REQUEST,
USER_SCRAPBUYERADMIN_MANAGEMENT_SUCCESS,
USER_SCRAPBUYERADMIN_MANAGEMENT_FAIL,
USER_SCRAPBUYERSTAFF_MANAGEMENT_FAIL,
USER_SCRAPBUYERSTAFF_MANAGEMENT_SUCCESS,
USER_SCRAPBUYERSTAFF_MANAGEMENT_REQUEST,
USER_SCRAPSELLER_FILTER_REQUEST,
        USER_SCRAPSELLER_FILTER_SUCCESS,
    USER_SCRAPSELLER_FILTER_FAIL  } from "../constants/userConstant";

import axios from "axios" 


export const login = (username, password) => async (dispatch) => {
    try{
        console.log("001")
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post(
            'https://scrap-selling-app-server.onrender.com/api/login/',
            {'username':username, 'password':password},
            config
        )
        console.log("002", data)
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        }) 
        
        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo"); 
    console.log("logout")
    dispatch({type:USER_LOGOUT})


}

    export const scrapBuyerAdminList = () => async (dispatch, getState) => {
    
       try{
           dispatch({type:USER_SCRAPBUYERADMIN_LIST_REQUEST})
           const {
            userLogin: {userInfo},
           
            } = getState()
    
            const config = {
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
        const { data } = await axios.get(
            `https://scrap-selling-app-server.onrender.com/api/admin/scraper-admin-management/`,
            config
            )
           
           dispatch({
               type:USER_SCRAPBUYERADMIN_LIST_SUCCESS,
               payload:data
           })
       }catch(error){
           dispatch({
               type:USER_SCRAPBUYERADMIN_LIST_FAIL,
               payload:error.response && error.response.data.detail
               ? error.response.data.detail
               : error.message,
           })
       }
    }  
    
    export const scrapBuyerStaffList = () => async (dispatch, getState) => {
    
        try{
            dispatch({type:USER_SCRAPBUYERSTAFF_LIST_REQUEST})
            const {
                userLogin: {userInfo},
               
                } = getState()
        
                const config = {
                    headers:{
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
         const { data } = await axios.get(
             `https://scrap-selling-app-server.onrender.com/api/admin/scraper-staff-management/`,
             config
             )
            
            dispatch({
                type:USER_SCRAPBUYERSTAFF_LIST_SUCCESS,
                payload:data
            })
        }catch(error){
            dispatch({
                type:USER_SCRAPBUYERSTAFF_LIST_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
        }
     }
     
     
     export const scrapSellerList = () => async (dispatch, getState) => {
    
        try{
            dispatch({type:USER_SCRAPSELLER_LIST_REQUEST})
            const {
                userLogin: {userInfo},
               
                } = getState()
        
                const config = {
                    headers:{
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
         const { data } = await axios.get(
             `https://scrap-selling-app-server.onrender.com/api/admin/scrape-seller-management`,
             config
             )
            
            dispatch({
                type:USER_SCRAPSELLER_LIST_SUCCESS,
                payload:data
            })
        }catch(error){
            dispatch({
                type:USER_SCRAPSELLER_LIST_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
        }
     } 
     
     
     export const scrapSellerManagement = (userId) => async (dispatch, getState) => {

        try{
            dispatch({type:USER_SCRAPSELLER_MANAGEMENT_REQUEST})
            console.log("req1")
            const {
                userLogin: {userInfo},
                scrapSellerList: {users},
                scrapSellerFilter: {filteredUsers}
               
                } = getState()
        
                const config = {
                    headers:{
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                console.log("req2", users)  
         const { data } = await axios.put(
             `https://scrap-selling-app-server.onrender.com/api/admin/scrape-seller-management/`,
             {"userId":userId},
             config
             )
             console.log("req3", data)
            
            dispatch({
                type:USER_SCRAPSELLER_MANAGEMENT_SUCCESS,
                payload:data
            })

            dispatch({
                type:USER_SCRAPSELLER_LIST_SUCCESS,
                payload:users.map((user) => {
                    if(user.id===data.id){
                        return data
                    }else{
                        return user
                    }
                })
            })
            
            if(filteredUsers.length !== 0){
            dispatch({
                type:USER_SCRAPSELLER_FILTER_SUCCESS,
                payload:filteredUsers.map((user) => {
                    if(user.id===data.id){
                        return data
                    }else{
                        return user
                    }
                })
            })
           }

            
        }catch(error){
            dispatch({
                type:USER_SCRAPSELLER_MANAGEMENT_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
        }
     } 


     export const scrapBuyerAdminManagement = (userId) => async (dispatch, getState) => {

        try{
            dispatch({type:USER_SCRAPBUYERADMIN_MANAGEMENT_REQUEST})
            console.log("req1")
            const {
                userLogin: {userInfo},
                scrapBuyerAdminList: {users}
               
                } = getState()
        
                const config = {
                    headers:{
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                console.log("req2", users)  
         const { data } = await axios.put(
             `https://scrap-selling-app-server.onrender.com/api/admin/scraper-admin-management/`,
             {"userId":userId},
             config
             )
             console.log("req3", data)
            
            dispatch({
                type:USER_SCRAPBUYERADMIN_MANAGEMENT_SUCCESS,
                payload:data
            })

            dispatch({
                type:USER_SCRAPBUYERADMIN_LIST_SUCCESS,
                payload:users.map((user) => {
                    if(user.id===data.id){
                        return data
                    }else{
                        return user
                    }
                })
            })

            
        }catch(error){
            dispatch({
                type:USER_SCRAPBUYERADMIN_MANAGEMENT_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
        }
     } 


     export const scrapBuyerStaffManagement = (userId) => async (dispatch, getState) => {

        try{
            dispatch({type:USER_SCRAPBUYERSTAFF_MANAGEMENT_REQUEST})
            console.log("req1")
            const {
                userLogin: {userInfo},
                scrapBuyerStaffList: {users}
               
                } = getState()
        
                const config = {
                    headers:{
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                console.log("req2", users)  
         const { data } = await axios.put(
             `https://scrap-selling-app-server.onrender.com/api/admin/scraper-staff-management/`,
             {"userId":userId},
             config
             )
             console.log("req3", data)
            
            dispatch({
                type:USER_SCRAPBUYERSTAFF_MANAGEMENT_SUCCESS,
                payload:data
            })

            dispatch({
                type:USER_SCRAPBUYERSTAFF_LIST_SUCCESS,
                payload:users.map((user) => {
                    if(user.id===data.id){
                        return data
                    }else{
                        return user
                    }
                })
            })

            
        }catch(error){
            dispatch({
                type:USER_SCRAPBUYERSTAFF_MANAGEMENT_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
        }
     } 


     export const filterScrapSellerList = (accountStatus, userId, joinedDate) => async (dispatch, getState) => {

        try{
            dispatch({type:USER_SCRAPSELLER_FILTER_REQUEST})
    
            const {
                scrapSellerList: {users},
                } = getState()

    
            const userFilter = users.filter((user) => {
                    if((accountStatus ? user.is_active : true)  && (joinedDate ? user.date_joined.slice(0, 10)===joinedDate : true)  && (userId ? (user.id===Number(userId) || user.username===userId || user.first_name===userId) : true)){
                        return user
                    }else{
                        return null
                    } 
                })
              
    
            dispatch({
                type:USER_SCRAPSELLER_FILTER_SUCCESS,
                payload: userFilter
            })
    
        }catch(error){
            dispatch({
                type:USER_SCRAPSELLER_FILTER_FAIL,
                payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
        }
     }     