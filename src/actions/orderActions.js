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
  SELLREQUEST_MANAGEMENT_FAIL,
  ORDER_FILTER_REQUEST,
ORDER_FILTER_SUCCESS,
ORDER_FILTER_FAIL,
SELLREQUEST_FILTER_REQUEST,
SELLREQUEST_FILTER_SUCCESS,
SELLREQUEST_FILTER_FAIL,
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
            sellRequestList: {sellRequests},
            sellrequestFilter: {filteredSellRequests}

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

    if(filteredSellRequests.length!==0){
        dispatch({
            type:SELLREQUEST_FILTER_SUCCESS,
            payload:filteredSellRequests.map((sellReq) => {
                if(sellReq.id===data.id){
                    return data
                }else{
                    return sellReq
                }
            })
        })
    }



    }catch(error){
        dispatch({
            type:SELLREQUEST_MANAGEMENT_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const filterOrderList = (orderStatus, orderId, totalPrice, acceptedDate, completedDate) => async (dispatch, getState) => {

    try{
        dispatch({type:ORDER_FILTER_REQUEST})
        console.log("ooi1price", totalPrice!==null)
        
        const {
            orderList: {orders},
            } = getState()
        
     /*(Number(totalPrice)===500 ? order.totalPrice<=500: Number(totalPrice)===5000 ? order.totalPrice>=5000 : false) : true)*/

        const filterFunc = orders.filter((order) => {
                if((completedDate ? order.completedDate?.slice(0, 10)===completedDate : true) && (acceptedDate ? order.acceptedDate===acceptedDate : true) && (orderStatus ? order.requestStatus===orderStatus : true) && (orderId ? (order.id===Number(orderId) || order.sellRequest.requestedUser.first_name===orderId) : true) && (totalPrice ? (totalPrice==="500" ? (order.totalPrice<=500.00 && order.totalPrice>0) : totalPrice==="5000" ? order.totalPrice>=5000.00 : false) : true)){
                    return order
                }else {
                    return null
                } 
            })

        dispatch({
            type:ORDER_FILTER_SUCCESS,
            payload: filterFunc 
        })

    }catch(error){
        dispatch({
            type:ORDER_FILTER_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const filterSellrequestList = (requestStatus, requestId, requestedDate) => async (dispatch, getState) => {

    try{
        dispatch({type:SELLREQUEST_FILTER_REQUEST})

        const {
            sellRequestList: {sellRequests},
            } = getState()
            

        const requestFilterFunc = sellRequests.filter((req) => {
                if((requestStatus ? req.requestStatus===requestStatus : true)  && (requestedDate ? req.requestedDate===requestedDate : true)  && (requestId ? (req.id===Number(requestId) || req.requestedUser.first_name===requestId) : true)){
                    return req
                }else{
                    return null
                } 
            })
          
            console.log("prooi", requestFilterFunc)

        dispatch({
            type:SELLREQUEST_FILTER_SUCCESS,
            payload: requestFilterFunc
        })

    }catch(error){
        dispatch({
            type:SELLREQUEST_FILTER_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }