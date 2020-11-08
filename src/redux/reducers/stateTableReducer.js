const initialState = {
    tableOfRegions: [],
    tableOfCities: []
}

const formReducer = (state = initialState, action) => {
    switch(action.type){
        case "FEEDBACKS_BY_REGIONS_REQUEST":
            return state = {...state, tableOfRegions: action.payload}
        case "FEEDBACKS_BY_REGION_ID_REQUEST":
            return state = {...state, tableOfCities: action.payload}
        default: return state
    }
}

export default formReducer