import feedbackReducer from "../reducers/FeedbackReducer";

export function setFeedbacks (feedbacks){
    return({
        type: "SET_FEEDBACKS",
        payload: feedbacks
    })
}

export function addFeedbacks (feedback){
    return({
        type: "ADD_FEEDBACKS",
        payload: feedback
    })
}