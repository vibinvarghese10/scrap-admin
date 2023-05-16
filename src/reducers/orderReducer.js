import { ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
     ORDER_LIST_FAIL,
     SELLREQUEST_LIST_REQUEST,
     SELLREQUEST_LIST_SUCCESS,
     SELLREQUEST_LIST_FAIL,
     STAT_REQUEST,
     STAT_SUCCESS,
     STAT_FAIL,
     STAT_CHART_REQUEST,
     STAT_CHART_SUCCESS,
     STAT_CHART_FAIL,
     SELLREQUEST_MANAGEMENT_REQUEST,
    SELLREQUEST_MANAGEMENT_SUCCESS,
    SELLREQUEST_MANAGEMENT_RESET,
  SELLREQUEST_MANAGEMENT_FAIL,
  ORDER_FILTER_REQUEST,
ORDER_FILTER_SUCCESS,
ORDER_FILTER_FAIL,
SELLREQUEST_FILTER_REQUEST,
SELLREQUEST_FILTER_SUCCESS,
SELLREQUEST_FILTER_FAIL,
SELLREQUEST_FILTER_RESET } from "../constants/orderConstant";


     const initialState = {
        orders: [],
        loading: false,
        error: null,
      };

     export const orderListReducers = (state = initialState, action) => {
        switch (action.type) {
            case ORDER_LIST_REQUEST:
              return { ...state, loading: true };
            case ORDER_LIST_SUCCESS:
              return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload
              };
            case ORDER_LIST_FAIL:
              return { ...state, loading: false, error: action.payload };
            default:
              return state;
          }
        }; 
        
        
        export const sellRequestListReducers = (state = {sellRequests:[], loading:true, error:null}, action) => {
          switch (action.type) {
              case SELLREQUEST_LIST_REQUEST:
                return { ...state, loading: true };
              case SELLREQUEST_LIST_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  error: null,
                  sellRequests: action.payload
                };
              case SELLREQUEST_LIST_FAIL:
                return { ...state, loading: false, error: action.payload };
              default:
                return state;
            }
          }; 

          export const statInfoReducer = (state = {stat:{}, loading:true, error:null}, action) => {
            switch (action.type) {
                case STAT_REQUEST:
                  return { ...state, loading: true };
                case STAT_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    error: null,
                    stat: action.payload
                  };
                case STAT_FAIL:
                  return { ...state, loading: false, error: action.payload };
                default:
                  return state;
              }
            }; 


            export const statChartInfoReducer = (state = {chartData:{user:{}, order:{}}, loading:true, error:null}, action) => {
              switch (action.type) {
                  case STAT_CHART_REQUEST:
                    return { ...state, loading: true };
                  case STAT_CHART_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      error: null,
                      chartData: action.payload
                    };
                  case STAT_CHART_FAIL:
                    return { ...state, loading: false, error: action.payload };
                  default:
                    return state;
                }
              }; 


            export const sellRequestManagementReducers = (state = {sellRequest:{}, error:null}, action) => {
              switch (action.type) {
                  case SELLREQUEST_MANAGEMENT_REQUEST:
                    return { ...state, loading: true };
                  case SELLREQUEST_MANAGEMENT_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      error: null,
                      sellRequest: action.payload
                    };

                  case SELLREQUEST_MANAGEMENT_RESET:
                    return {
                      sellRequest: {}
                    };  

                  case SELLREQUEST_MANAGEMENT_FAIL:
                    return { ...state, loading: false, error: action.payload };
                  default:
                    return state;
                }
              }; 
              
              
              export const orderFilterReducers = (state = {orders: [], loading: false}, action) => {
                switch (action.type) {
                    case ORDER_FILTER_REQUEST:
                      return { ...state, loading: true };
                    case ORDER_FILTER_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        orders: action.payload
                      };
                    case ORDER_FILTER_FAIL:
                      return { ...state, loading: false, error: action.payload };
                      
                    default:
                      return state;
                  }
                }; 
                
                export const sellrequestFilterReducers = (state = {filteredSellRequests: [], loading: false}, action) => {
                  switch (action.type) {
                      case SELLREQUEST_FILTER_REQUEST:
                        return { ...state, loading: true };
                      case SELLREQUEST_FILTER_SUCCESS:
                        return {
                          ...state,
                          loading: false,
                          filteredSellRequests: action.payload,
                        };
                      case SELLREQUEST_FILTER_FAIL:
                        return { ...state, loading: false, error: action.payload };
                      
                      case SELLREQUEST_FILTER_RESET:
                        return {filteredSellRequests:[]}  
                        
                      default:
                        return state;
                    }
                  };          