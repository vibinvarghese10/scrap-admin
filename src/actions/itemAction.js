import { ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
     ITEM_LIST_FAIL,
     ITEM_UPDATE_REQUEST,
     ITEM_UPDATE_SUCCESS,
      ITEM_UPDATE_FAIL,
      ITEM_ADD_REQUEST,
      ITEM_ADD_SUCCESS,
      ITEM_ADD_RESET,
       ITEM_ADD_FAIL,
       ITEM_DELETE_REQUEST,
       ITEM_DELETE_SUCCESS,
       ITEM_DELETE_RESET,
        ITEM_DELETE_FAIL,
        CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS,
      CATEGORY_LIST_FAIL,
      ITEM_FILTER_REQUEST,
      ITEM_FILTER_SUCCESS,
    ITEM_FILTER_FAIL } from "../constants/itemConstant";

import axios from "axios"     




export const listItems = () => async (dispatch, getState) => {

   try{
       dispatch({type:ITEM_LIST_REQUEST})
       console.log("ooi1")
       
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
           `https://scrap-selling-app-server.onrender.com/api/admin/item-management/`,
           config
           )
           console.log("ooi2", data)

       dispatch({
           type:ITEM_LIST_SUCCESS,
           payload:data
       })
   }catch(error){
       dispatch({
           type:ITEM_LIST_FAIL,
           payload:error.response && error.response.data.detail
           ? error.response.data.detail
           : error.message,
       })
   }
}


export const updateItem = (item) => async (dispatch) => {

    try{
        dispatch({type:ITEM_UPDATE_REQUEST})
        const config = {
            headers:{
                'Content-type':'application/json',
            }
        }
        const { data } = await axios.put(
            `https://scrap-selling-app-server.onrender.com/api/admin/item-management/`,
            item,
            config
            )

        dispatch({
            type:ITEM_UPDATE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ITEM_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }

 export const addItem = (item) => async (dispatch) => {

    try{
        dispatch({type:ITEM_ADD_REQUEST})
        const config = {
            headers:{
                'Content-type':'application/json',
            }
        }
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/admin/add/scrap-item/`,
            item,
            config
            )

        dispatch({
            type:ITEM_ADD_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ITEM_ADD_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }

 export const deleteItem = (itemId) => async (dispatch) => {
     console.log("oom", itemId)

    try{
        dispatch({type:ITEM_DELETE_REQUEST})
        const config = {
            headers:{
                'Content-type':'application/json',
            }
        }
        const { data } = await axios.delete(
            `http://127.0.0.1:8000/api/admin/delete/scrap-item/${itemId}/`,
            config
            )

        dispatch({
            type:ITEM_DELETE_SUCCESS,
            payload:data.itemId
        })
    }catch(error){
        dispatch({
            type:ITEM_DELETE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }

 export const listCategories = () => async (dispatch) => {

    try{
        dispatch({type:CATEGORY_LIST_REQUEST})
        const { data } = await axios.get(`http://127.0.0.1:8000/api/admin/scrap-items/`)
 
        dispatch({
            type:CATEGORY_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:CATEGORY_LIST_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const filterItem = (categoryName) => async (dispatch, getState) => {

    try{
        dispatch({type:ITEM_FILTER_REQUEST})
        
        const {
            itemList: {items},
            } = getState()

        const filterFunc = () => (
            items.filter(item => item.category.categoryName===categoryName)
        )

        dispatch({
            type:ITEM_FILTER_SUCCESS,
            payload: filterFunc() 
        })
    }catch(error){
        dispatch({
            type:ITEM_ADD_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }