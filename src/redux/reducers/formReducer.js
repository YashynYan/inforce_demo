const initialState = {
    regions: [],
    cities: []
}

const formReducer = (state = initialState, action) => {
    switch(action.type){
        case "FETCH_REGIONS_REQUEST":
            return state = {...state, regions: action.payload}
        case "FETCH_CITIES_BY_REGION_ID_REQUEST":
            return state = {...state, cities: action.payload}
        default: return state
    }
}

export default formReducer