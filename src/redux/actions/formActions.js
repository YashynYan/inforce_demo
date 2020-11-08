export function fetchRegions () {
        return {type: "FETCH_REGIONS"}
    }

export function fetchCitiesByRegionId (region_id) {
        return {type: "FETCH_CITIES_BY_REGION_ID", region_id: region_id}
    
}
