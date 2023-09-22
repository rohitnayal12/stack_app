import { DELETE_QUESTION_SUCCESS, GET_QUESTION_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, POST_QUESTION_SUCCESS, QUESTION_FAILURE, QUESTION_REQUIRE, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS } from "../actionType"
import axios from "axios"
export function postquestion (newdata){
    return async (dispatch)=>{
   try {
    console.log(newdata)
    dispatch({type:QUESTION_REQUIRE})
  let res= await  axios.post("https://stack-server-9jz4.onrender.com/forum",newdata)
  alert("Qustion Posted Succeessful.")
  dispatch({type:POST_QUESTION_SUCCESS})

    
   } catch (error) {
    dispatch({type:QUESTION_FAILURE})
   }
    }
}

export function getQuestion (){
    return async (dispatch)=>{
   try {
    dispatch({type:QUESTION_REQUIRE})
  let res= await  axios.get("https://stack-server-9jz4.onrender.com/forum")
 let allquestion=res.data
console.log(allquestion)
  dispatch({type:GET_QUESTION_SUCCESS,payload:allquestion})
    
   } catch (error) {
    dispatch({type:QUESTION_FAILURE})
   }
    }
}

export function deleteQuestion (id){
    return async (dispatch)=>{
   try {
    dispatch({type:QUESTION_REQUIRE})
    const url = `https://stack-server-9jz4.onrender.com/forum/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({ type: DELETE_QUESTION_SUCCESS });
        alert("Question Deleted successfully.");
      } else {
        throw new Error("Failed to delete question");
      }
    
   } catch (error) {
    dispatch({type:QUESTION_FAILURE})
   }
    }
}