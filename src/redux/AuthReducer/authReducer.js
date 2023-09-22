// src/store/reducers/authReducer.js

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS } from "../actionType";

const initialState = {
   isLoading:false,
   isError:false,
   isAuth:false,
   user:{},
   
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading:true,
          isError:false,
          isAuth:false,
         
        };
      
        case LOGIN_SUCCESS:
        return {
          ...state,
          isLoading:false,
          isError:false,
          isAuth:true,
          user:action.payload
        };
        case LOGIN_FAILURE:
        return {
          ...state,
          isLoading:false,
          isError:true,
          isAuth:false,
        
        };
        case SIGNIN_REQUEST:
        return {
          ...state,
          isLoading:true,
          isError:false,
          isAuth:false,
          user:{}
        };
        case SIGNIN_SUCCESS:
        return {
          ...state,
          isLoading:true,
          isError:false,
          isAuth:false,
          user:{}
        };
        case SIGNIN_FAILURE:
        return {
          ...state,
          isLoading:false,
          isError:true,
          isAuth:false,
          user:{}
        };
      
      default:
        return state;
    }
  };
  
  export default authReducer;
  