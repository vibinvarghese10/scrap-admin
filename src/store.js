import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { itemListReducers, itemUpdateReducers, itemAddReducers, itemDeleteReducers, categoryListReducers, itemFilterReducers } from './reducers/itemReducer'
import { orderListReducers, sellrequestFilterReducers, orderFilterReducers, statInfoReducer, sellRequestListReducers, sellRequestManagementReducers } from './reducers/orderReducer'
import { scrapBuyerAdminListReducer, scrapSellerFilterReducer, scrapSellerManagementReducer, scrapBuyerAdminManagementReducer, scrapBuyerStaffManagementReducer, scrapBuyerStaffListReducer, scrapSellerListReducer, userLoginReducers } from './reducers/userReducer'

import { composeWithDevTools } from 'redux-devtools-extension'




const reducer = combineReducers({
    itemList:itemListReducers,
    orderList:orderListReducers,
    itemUpdate:itemUpdateReducers,
    itemAdd:itemAddReducers,
    itemDelete:itemDeleteReducers,
    sellRequestList:sellRequestListReducers,
    scrapSellerList:scrapSellerListReducer,
    scrapBuyerStaffList:scrapBuyerStaffListReducer,
    scrapBuyerAdminList:scrapBuyerAdminListReducer,
    categoryList:categoryListReducers,
    userLogin: userLoginReducers,
    scrapSellerManagement:scrapSellerManagementReducer,
    scrapBuyerStaffManagement:scrapBuyerStaffManagementReducer,
    scrapBuyerAdminManagement:scrapBuyerAdminManagementReducer,
    statInfo:statInfoReducer,
    sellRequestManagement:sellRequestManagementReducers,
    itemFilter:itemFilterReducers,
    orderFilter:orderFilterReducers,
    sellrequestFilter:sellrequestFilterReducers,
    scrapSellerFilter:scrapSellerFilterReducer,
})


const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;