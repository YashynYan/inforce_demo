const regionUrl = "http://localhost:8000/api/v1/region/"
const cityUrl = "http://localhost:8000/api/v1/city/region/"

export function fetchRegions () {
    return async dispatch => {
        const response = await fetch(regionUrl)
        const json = await response.json()
        dispatch ({type: "FETCH_REGIONS", payload: json.data})
    }   
}

export function fetchCities (region_id) {
    return async dispatch => {
        const response = await fetch(cityUrl + region_id)
        const json = await response.json()
        console.log(json)
        dispatch ({type: "FETCH_CITIES", payload: json.data})
    }   
}