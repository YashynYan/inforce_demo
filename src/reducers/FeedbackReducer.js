const initialState = {
    feedbacks: [],
    selectedFeedback: null,
    error: null
}

const feedbackReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case "SET_FEEDBACKS": 
            return state = {...state, feedbacks: action.payload}
        case "ADD_FEEDBACKS": 
            return state = {...state, feedbacks: state.feedbacks.concat(action.payload)}
        case "SET_SELECTED_FEEDBACK": 
            return state = {...state, selectedFeedback: state.feedbacks.find(item => item.feedback_id === action.payload)}
        case "FETCH_FEEDBACKS":
            return state = {...state, feedbacks: action.payload}
        case "DELETE_FEEDBACK":
            return state = {...state, feedbacks: state.feedbacks.filter( item => item.feedback_id !== action.payload)}
        case "POST_FEEDBACK":
            return state = {...state }
        case "PUT_FEEDBACK":
            return state = {...state }
        case "SET_ERROR":
            return state = {...state, error: action.payload}
        default: return state
    }
}

export default feedbackReducer;