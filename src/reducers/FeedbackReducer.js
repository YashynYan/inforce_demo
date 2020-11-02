const initialState = {
    feedbacks: [],
    selectedFeedback: null
}

const feedbackReducer = (state = initialState, action) => {
    console.log(action, state.feedbacks.find(item => item.feedback_id === action.payload))
    switch(action.type){
        case "SET_FEEDBACKS": 
            return state = {...state, feedbacks: action.payload}
        case "ADD_FEEDBACKS": 
            return state = {...state, feedbacks: state.feedbacks.concat(action.payload)}
        case "SET_SELECTED_FEEDBACK": 
            return state = {...state, selectedFeedback: state.feedbacks.find(item => item.feedback_id === action.payload)}
        default: return state
    }
}

export default feedbackReducer;