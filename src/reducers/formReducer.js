const initialState = {
    regions: [],
    cities: []
}

const formReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case "FETCH_REGIONS":
            return state = {...state, regions: action.payload}
        case "FETCH_CITIES":
            return state = {...state, cities: action.payload}
        default: return state
    }
}

export default formReducer