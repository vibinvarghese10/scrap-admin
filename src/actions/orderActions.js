import { ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
     ORDER_LIST_FAIL,
     SELLREQUEST_LIST_REQUEST,
     SELLREQUEST_LIST_SUCCESS,
     SELLREQUEST_LIST_FAIL, 
     STAT_REQUEST,
     STAT_SUCCESS,
     STAT_FAIL,
     SELLREQUEST_MANAGEMENT_REQUEST,
    SELLREQUEST_MANAGEMENT_SUCCESS,
  SELLREQUEST_MANAGEMENT_FAIL
      } from "../constants/orderConstant";

import axios from "axios"     




export const listOrders = () => async (dispatch, getState) => {

   try{
       dispatch({type:ORDER_LIST_REQUEST})
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
        `https://scrap-selling-app-server.onrender.com/api/admin/order-management/`,
        config
        )
       
       dispatch({
           type:ORDER_LIST_SUCCESS,
           payload:data
       })
   }catch(error){
       dispatch({
           type:ORDER_LIST_FAIL,
           payload:error.response && error.response.data.detail
           ? error.response.data.detail
           : error.message,
       })
   }
}

export const listSellRequest = () => async (dispatch, getState) => {

    try{
        console.log("ooi1")
        dispatch({type:SELLREQUEST_LIST_REQUEST})
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
         `https://scrap-selling-app-server.onrender.com/api/admin/sellrequest-management/`,
         config
         )
         console.log("ooi2", data)
        
        dispatch({
            type:SELLREQUEST_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:SELLREQUEST_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const getAllStatInfo = () => async (dispatch, getState) => {

    try{
        console.log("ooi1")
        dispatch({type:STAT_REQUEST})
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
         `https://scrap-selling-app-server.onrender.com/api/admin/stats/`,
         config
         )
         console.log("ooi2", data)
        
        dispatch({
            type:STAT_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:STAT_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const sellRequestManagement = (sellRequestId) => async (dispatch, getState) => {

    try{
        console.log("ooi1")
        dispatch({type:SELLREQUEST_MANAGEMENT_REQUEST})
        const {
            userLogin: {userInfo},
            sellRequestList: {sellRequests}

            } = getState()
            console.log("oooooooooooooooooo", sellRequests)
    
            const config = {
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

     const { data } = await axios.put(
         `https://scrap-selling-app-server.onrender.com/api/admin/sellrequest-management/`,
         {"sellRequestId":sellRequestId},
         config
         )
         console.log("ooi2", data)
        
        dispatch({
            type:SELLREQUEST_MANAGEMENT_SUCCESS,
            payload:data
        })

        dispatch({
            type:SELLREQUEST_LIST_SUCCESS,
            payload:sellRequests.map((sellReq) => {
                if(sellReq.id===data.id){
                    return data
                }else{
                    return sellReq
                }
            })
        })

    }catch(error){
        dispatch({
            type:SELLREQUEST_MANAGEMENT_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }