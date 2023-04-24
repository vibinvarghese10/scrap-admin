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
         USER_SCRAPBUYERSTAFF_MANAGEMENT_REQUEST } from "../constants/userConstant";

         export const userLoginReducers = (state = {userInfo:{}}, action) => {
          switch(action.type){
              case USER_LOGIN_REQUEST:
                  return {...state, loading:true}
      
              case USER_LOGIN_SUCCESS:
                  return {...state, loading:false, userInfo: action.payload}  
                  
              case USER_LOGIN_FAIL:
                  return {...state, loading:false, error:action.payload}  
                  
              case USER_LOGOUT:
                  return {userInfo:{}}      
                  
              default:
                  return state    
          }
      
      }       




  export const scrapBuyerAdminListReducer = (state = {users:[], loading:true, error:null}, action) => {
    switch (action.type) {
        case USER_SCRAPBUYERADMIN_LIST_REQUEST:
          return { ...state, loading: true };
        case USER_SCRAPBUYERADMIN_LIST_SUCCESS:
          return {
            ...state,
            loading: false,
            error: null,
            users: action.payload
          };
        case USER_SCRAPBUYERADMIN_LIST_FAIL:
          return { ...state, loading: false, error: action.payload };
        default:
          return state;
      }
    }; 

    export const scrapBuyerStaffListReducer = (state = {users:[], loading:true, error:null}, action) => {
        switch (action.type) {
            case USER_SCRAPBUYERSTAFF_LIST_REQUEST:
              return { ...state, loading: true };
            case USER_SCRAPBUYERSTAFF_LIST_SUCCESS:
              return {
                ...state,
                loading: false,
                error: null,
                users: action.payload
              };
            case USER_SCRAPBUYERSTAFF_LIST_FAIL:
              return { ...state, loading: false, error: action.payload };
            default:
              return state;
          }
        }; 

        export const scrapSellerListReducer = (state = {users:[], loading:true, error:null}, action) => {
            switch (action.type) {
                case USER_SCRAPSELLER_LIST_REQUEST:
                  return { ...state, loading: true };
                case USER_SCRAPSELLER_LIST_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    error: null,
                    users: action.payload
                  };
                case USER_SCRAPSELLER_LIST_FAIL:
                  return { ...state, loading: false, error: action.payload };
                default:
                  return state;
              }
            }; 


            export const scrapSellerManagementReducer = (state = {user:{}, loading:false, error:null}, action) => {
              switch (action.type) {
                  case USER_SCRAPSELLER_MANAGEMENT_REQUEST:
                    return { ...state, loading: true };
                  case USER_SCRAPSELLER_MANAGEMENT_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      error: null,
                      user: action.payload
                    };
                  case USER_SCRAPSELLER_MANAGEMENT_FAIL:
                    return { ...state, loading: false, error: action.payload };
                  default:
                    return state;
                }
              }; 


              export const scrapBuyerStaffManagementReducer = (state = {user:{}, loading:false, error:null}, action) => {
                switch (action.type) {
                    case USER_SCRAPBUYERSTAFF_MANAGEMENT_REQUEST:
                      return { ...state, loading: true };
                    case USER_SCRAPBUYERSTAFF_MANAGEMENT_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        error: null,
                        user: action.payload
                      };
                    case USER_SCRAPBUYERSTAFF_MANAGEMENT_FAIL:
                      return { ...state, loading: false, error: action.payload };
                    default:
                      return state;
                  }
                }; 


                export const scrapBuyerAdminManagementReducer = (state = {user:{}, loading:false, error:null}, action) => {
                  switch (action.type) {
                      case USER_SCRAPBUYERADMIN_MANAGEMENT_REQUEST:
                        return { ...state, loading: true };
                      case USER_SCRAPBUYERADMIN_MANAGEMENT_SUCCESS:
                        return {
                          ...state,
                          loading: false,
                          error: null,
                          user: action.payload
                        };
                      case USER_SCRAPBUYERADMIN_MANAGEMENT_FAIL:
                        return { ...state, loading: false, error: action.payload };
                      default:
                        return state;
                    }
                  };               