import { ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
     ITEM_LIST_FAIL,
     ITEM_UPDATED,
     ITEM_ADDED,
     ITEM_DELETED,
     ITEM_UPDATE_REQUEST,
     ITEM_UPDATE_SUCCESS,
     ITEM_UPDATE_RESET,
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
ITEM_FILTER_FAIL,
CATEGORY_ADD_REQUEST,
CATEGORY_ADD_SUCCESS,
CATEGORY_ADD_FAIL,
CATEGORY_UPDATE_REQUEST,
CATEGORY_UPDATE_SUCCESS,
CATEGORY_UPDATE_FAIL,
CATEGORY_DELETE_REQUEST,
CATEGORY_DELETE_SUCCESS,
CATEGORY_DELETE_FAIL  } from "../constants/itemConstant"


     

     export const itemListReducers = (state = {items:[], categories:[], loading:false, error:null}, action) => {
        switch (action.type) {
            case ITEM_LIST_REQUEST:
              return { ...state, loading: true };

            case ITEM_LIST_SUCCESS:
              return {
                ...state,
                loading: false,
                error: null,
                items: action.payload
              };

            case ITEM_UPDATED:
              return {...state, items: state.items.map((item) => (
                item.id === action.payload.id ? action.payload : item
              ))};

            case ITEM_ADDED:
              return {...state, items: [...state.items, action.payload]};
              
            case ITEM_DELETED:
              console.log("uff", action.payload)
              return {...state, items: state.items.filter((item) => item.id !== action.payload)};  

            case ITEM_LIST_FAIL:
              return { ...state, loading: false, error: action.payload };
            default:
              return state;
          }
        }; 
        
        

        export const itemUpdateReducers = (state = {item:{}, loading:false, error:null, updated:false}, action) => {
          switch (action.type) {
              case ITEM_UPDATE_REQUEST:
                return { ...state, loading: true };
              case ITEM_UPDATE_SUCCESS:
          
                return {
                  ...state,
                  loading: false,
                  error: null,
                  item: action.payload,
                  updated:true
                };

              case ITEM_UPDATE_RESET:
                  return {...state, item:{}, updated:false};  

              case ITEM_UPDATE_FAIL:
                return { ...state, loading: false, error: action.payload };
              default:
                return state;
            }
          }; 
          
          export const itemAddReducers = (state = {item:{}, loading:false, error:null, added:false}, action) => {
            switch (action.type) {
                case ITEM_ADD_REQUEST:
                  return { ...state, loading: true };
                case ITEM_ADD_SUCCESS:
            
                  return {
                    ...state,
                    loading: false,
                    error: null,
                    item: action.payload,
                    added:true
                  };
  
                case ITEM_ADD_RESET:
                    return {...state, item:{}, added:false};  
  
                case ITEM_ADD_FAIL:
                  return { ...state, loading: false, error: action.payload };
                default:
                  return state;
              }
            }; 


  export const itemDeleteReducers = (state = {itemId:null, loading:false, error:null, deleted:false}, action) => {
            switch (action.type) {
                case ITEM_DELETE_REQUEST:
                  return { ...state, loading: true };

                case ITEM_DELETE_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    error: null,
                    itemId: action.payload,
                    deleted:true
                  };
  
                case ITEM_DELETE_RESET:
                    return {...state, itemId:null, deleted:false};  
  
                case ITEM_DELETE_FAIL:
                  return { ...state, loading: false, error: action.payload };
                default:
                  return state;
              }
            };
            
            export const categoryListReducers = (state = {categories:[], loading:true, error:null}, action) => {
              switch (action.type) {
                  case CATEGORY_LIST_REQUEST:
                    return { ...state, loading: true };
  
                  case CATEGORY_LIST_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      error: null,
                      categories: action.payload,

                    };
    
                  case CATEGORY_LIST_FAIL:
                    return { ...state, loading: false, error: action.payload };
                    
                  default:
                    return state;
                }
              };    


              export const categoryAddReducers = (state = {category:[], loading:false, error:null}, action) => {
              switch (action.type) {
                  case CATEGORY_ADD_REQUEST:
                    return { ...state, loading: true };
  
                  case CATEGORY_ADD_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      error: null,
                      category: action.payload,
                    };
    
                  case CATEGORY_ADD_FAIL:
                    return { ...state, loading: false, error: action.payload };
                    
                  default:
                    return state;
                }
              }; 
              
              export const categoryUpdateReducers = (state = {category:[], loading:false, error:null}, action) => {
                switch (action.type) {
                    case CATEGORY_UPDATE_REQUEST:
                      return { ...state, loading: true };
    
                    case CATEGORY_UPDATE_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        error: null,
                        category: action.payload,
                      };
      
                    case CATEGORY_UPDATE_FAIL:
                      return { ...state, loading: false, error: action.payload };
                      
                    default:
                      return state;
                  }
                }; 

                export const categoryDeleteReducers = (state = {category:[], loading:false, error:null}, action) => {
                  switch (action.type) {
                      case CATEGORY_DELETE_REQUEST:
                        return { ...state, loading: true };
      
                      case CATEGORY_DELETE_SUCCESS:
                        return {
                          ...state,
                          loading: false,
                          error: null,
                          category: action.payload,
                        };
        
                      case CATEGORY_DELETE_FAIL:
                        return { ...state, loading: false, error: action.payload };
                        
                      default:
                        return state;
                    }
                  };   


              export const itemFilterReducers = (state = {items:[], loading:false}, action) => {
                switch (action.type) {
                    case ITEM_FILTER_REQUEST:
                      return { ...state, loading: true };

                    case ITEM_FILTER_SUCCESS:
                      return {
                        ...state,
                        loading: false,
                        items: action.payload,
                      };
      
                    case ITEM_ADD_FAIL:
                      return { ...state, loading: false, error: action.payload };
                    default:
                      return state;
                  }
                };              