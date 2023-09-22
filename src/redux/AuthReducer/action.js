import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS } from "../actionType"
import axios from "axios"
export function signin (newdata){
    return async (dispatch)=>{
   try {
    console.log(newdata)
    dispatch({type:SIGNIN_REQUEST})
  let res= await  axios.post("https://stack-server-9jz4.onrender.com/users",newdata)
  alert("Registration Succeessful.")
  dispatch({type:SIGNIN_SUCCESS})
    
   } catch (error) {
    dispatch({type:SIGNIN_FAILURE})
   }
    }
}

export function login (newdata){
    return async (dispatch)=>{
   try {
    dispatch({type:LOGIN_REQUEST})
  let res= await  axios.get("https://stack-server-9jz4.onrender.com/users")
 let alluser=res.data
 let ans=alluser.filter((user)=>{
    return user.email==newdata.email && user.password==newdata.password
 })
  dispatch({type:LOGIN_SUCCESS,payload:{...ans[0]}})
    
   } catch (error) {
    dispatch({type:LOGIN_FAILURE})
   }
    }
}