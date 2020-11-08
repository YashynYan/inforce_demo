const url = "http://localhost:8000/api/v1/feedback/"

export function fetchFeedbacks () {
        return {type: "FETCH_FEEDBACKS"}
    }   

export function deleteFeedback (id) {
    return async dispatch => {
        const response = await fetch(url + id, {
            method: 'DELETE'
        })
        const json = await response.json()
        dispatch ({type: "DELETE_FEEDBACK", payload: id})
    }   
}

export function postFeedback (feedback) {
    return {type: "POST_FEEDBACK", payload: feedback}
} 

export function putFeedback (id, feedback) {
    return async dispatch => {
       const response = await fetch(url + id, {
           body: JSON.stringify(feedback),
           method: 'PUT',
           headers: { 
               "Content-type": "application/json; charset=UTF-8",
               "Accept": "application/json"
           } 
       })
       const json = await response.json()
       if (json.message!==undefined){
           dispatch ({type: "PUT_FEEDBACK", payload: json})
       } else {
           dispatch ({type: "SET_ERROR", payload: json.error})
       }
       
    }   
} 

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

export function setSelectedFeedback (id){
    return({
        type: "SET_SELECTED_FEEDBACK",
        payload: id
    })
}