// src/store/reducers/forumReducer.js

import { DELETE_QUESTION_SUCCESS, GET_QUESTION_SUCCESS, POST_QUESTION_SUCCESS, QUESTION_FAILURE, QUESTION_REQUIRE,  } from "../actionType";

const initialState = {
  isLoading:false,
  isError:false,
  questions: [], 
  };
  
  const forumReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_QUESTION_SUCCESS:
        return {
          ...state,
          isLoading:false,
          questions: action.payload,
        };
        case QUESTION_FAILURE:
          return {
            ...state,
            isLoading:false,
            isError:true
          };
          case QUESTION_REQUIRE:
          return {
            ...state,
            isLoading:true,
            isError:false,
          };
      case POST_QUESTION_SUCCESS:
        return {
          ...state,
          isLoading:false,
          questions: [...state.questions, action.payload.question],
        };
      case DELETE_QUESTION_SUCCESS:
        return {
          ...state,
          isLoading:false,
          questions: state.questions.filter(
            (question) => question.id !== action.payload.questionId
          ),
        };
      // Add more cases for other forum-related actions as needed
      default:
        return state;
    }
  };
  
  export default forumReducer;
  