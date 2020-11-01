const initialState = {
    feedbacks: []
}

const feedbackReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_FEEDBACKS": 
            return state = {...state, feedbacks: action.payload}
        case "ADD_FEEDBACKS": 
            return state = {...state, feedbacks: state.feedbacks.concat(action.payload)}
        default: return state
    }
}

export default feedbackReducer;