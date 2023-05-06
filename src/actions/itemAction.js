import { ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
     ITEM_LIST_FAIL,
     ITEM_UPDATE_REQUEST,
     ITEM_UPDATE_SUCCESS,
      ITEM_UPDATE_FAIL,
      ITEM_ADD_REQUEST,
      ITEM_ADD_SUCCESS,
       ITEM_ADD_FAIL,
       ITEM_DELETE_REQUEST,
       ITEM_DELETE_SUCCESS,
        ITEM_DELETE_FAIL,
        CATEGORY_LIST_REQUEST,
        CATEGORY_LIST_SUCCESS,
      CATEGORY_LIST_FAIL,
      ITEM_FILTER_REQUEST,
      ITEM_FILTER_SUCCESS,
    CATEGORY_ADD_REQUEST,
    CATEGORY_ADD_SUCCESS,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL } from "../constants/itemConstant";

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


export const updateItem = (item) => async (dispatch, getState) => {

    try{
        dispatch({type:ITEM_UPDATE_REQUEST})

        const {
            userLogin: {userInfo},
            itemList: {items}
           
            } = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
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

        dispatch({
            type:ITEM_LIST_SUCCESS,
            payload:items.map((item) => {
                if(item.id===data.id){
                    return data
                }else{
                    return item
                }
            })
        })
    }catch(error){
        dispatch({
            type:ITEM_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
        console.log(error.message)
    }
 }

 export const addItem = (item) => async (dispatch, getState) => {

    try{
        dispatch({type:ITEM_ADD_REQUEST})

        const {
            userLogin: {userInfo},
            itemList: {items}
            } = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.post(
            `https://scrap-selling-app-server.onrender.com/api/admin/item-management/`,
            item,
            config
            )

        dispatch({
            type:ITEM_ADD_SUCCESS,
            payload:data
        })

        dispatch({
            type:ITEM_LIST_SUCCESS,
            payload:[...items, data]
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

 export const deleteItem = (itemId) => async (dispatch, getState) => {
     console.log("oom", itemId)

    try{
        dispatch({type:ITEM_DELETE_REQUEST})
        const {
            userLogin: {userInfo},
            itemList: {items}
           
            } = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.delete(
            `https://scrap-selling-app-server.onrender.com/api/admin/item-management/?id=${itemId}`,
            config
            )

        dispatch({
            type:ITEM_DELETE_SUCCESS,
            payload:data.itemId
        })

        dispatch({
            type:ITEM_LIST_SUCCESS,
            payload:items.filter(item => item.id!==itemId)
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

 export const listCategories = () => async (dispatch, getState) => {

    try{
        dispatch({type:CATEGORY_LIST_REQUEST})

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
            `https://scrap-selling-app-server.onrender.com/api/admin/category-management/`,
            config
            )
 
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

 export const addCategory = (category) => async (dispatch, getState) => {

    try{
        dispatch({type:CATEGORY_ADD_REQUEST})

        const {
            userLogin: {userInfo},
            categoryList: {categories}
            } = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.post(
            `https://scrap-selling-app-server.onrender.com/api/admin/category-management/`,
            category,
            config
            )

        dispatch({
            type:CATEGORY_ADD_SUCCESS,
            payload:data
        })

        dispatch({
            type:CATEGORY_LIST_SUCCESS,
            payload:[...categories, data]
        })
    }catch(error){
        dispatch({
            type:CATEGORY_ADD_SUCCESS,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const updateCategory = (category) => async (dispatch, getState) => {

    try{
        dispatch({type:CATEGORY_UPDATE_REQUEST})

        const {
            userLogin: {userInfo},
            categoryList: {categories}
            } = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.put(
            `https://scrap-selling-app-server.onrender.com/api/admin/category-management/`,
            category,
            config
            )

        dispatch({
            type:CATEGORY_UPDATE_SUCCESS,
            payload:data
        })

        dispatch({
            type:CATEGORY_LIST_SUCCESS,
            payload:categories.map((category) => {
                if(category.id===data.id){
                    return data
                }else{
                    return category
                }
            })
        })
    }catch(error){
        dispatch({
            type:CATEGORY_UPDATE_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
 }


 export const deleteCategory = (categoryId) => async (dispatch, getState) => {

    try{
        dispatch({type:CATEGORY_DELETE_REQUEST})

        const {
            userLogin: {userInfo},
            categoryList: {categories}
            } = getState()


        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.delete(
            `https://scrap-selling-app-server.onrender.com/api/admin/category-management?id=${categoryId}`,
            config
            )

        dispatch({
            type:CATEGORY_DELETE_SUCCESS,
            payload:data
        })

        dispatch({
            type:CATEGORY_LIST_SUCCESS,
            payload:categories.filter(category => category.id!==categoryId)
        })

    }catch(error){
        dispatch({
            type:CATEGORY_DELETE_FAIL,
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