import {takeEvery, put, call} from 'redux-saga/effects' 

const feedbackUrl = "http://localhost:8000/api/v1/feedback/"
const regionUrl = "http://localhost:8000/api/v1/region/"
const cityUrl = "http://localhost:8000/api/v1/city/region/"

export function* sagaWatcher() {
    yield takeEvery("FETCH_FEEDBACKS", sagaFetchAllFeedbacks)
    yield takeEvery("FEEDBACKS_BY_REGIONS", sagaFeedbacksByRegions)
    yield takeEvery("FEEDBACKS_BY_REGION_ID", sagaFeedbacksByRegionId)
    yield takeEvery("FETCH_REGIONS", sagaFetchAllRegions)
    yield takeEvery("FETCH_CITIES_BY_REGION_ID", sagaFetchAllCitiesByRegionsId)
}

function* sagaFetchAllFeedbacks() {
    const payload = yield call(fetchAllFeedbacks)
    console.log(payload)
    yield put ({type: "FETCH_FEEDBACKS_REQUEST", payload: payload.data})
}

function* sagaFetchAllRegions() {
    const payload = yield call(fetchAllRegions)
    console.log(payload)
    yield put ({type: "FETCH_REGIONS_REQUEST", payload: payload.data})
}

function* sagaFetchAllCitiesByRegionsId(object) {
    const payload = yield call(fetchAllCitiesByRegionId, object.region_id)
    console.log(payload)
    yield put ({type: "FETCH_CITIES_BY_REGION_ID_REQUEST", payload: payload.data})
}

function* sagaFeedbacksByRegions() {
    const regionsPayload = yield call(fetchAllRegions)
    console.log(regionsPayload)
    const feedbacksPayload = yield call(fetchAllFeedbacks)
    const tableArray = createTableArray(regionsPayload.data, feedbacksPayload.data)
    console.log(tableArray)
    yield put ({type: "FEEDBACKS_BY_REGIONS_REQUEST", payload: tableArray})
}

function* sagaFeedbacksByRegionId(object) {
    console.log(object.id)
    const citiesPayload = yield call(fetchAllCitiesByRegionId, object.id)
    const feedbacksPayload = yield call(fetchAllFeedbacks)
    console.log(feedbacksPayload)
    const tableArray = createCityTableArray(citiesPayload.data, feedbacksPayload.data)
    console.log(tableArray)
    yield put ({type: "FEEDBACKS_BY_REGION_ID_REQUEST", payload: tableArray})
}

async function fetchAllFeedbacks() {
    const response = await fetch(feedbackUrl)
    return await response.json()
}

async function fetchAllRegions() {
    const response = await fetch(regionUrl)
    return await response.json()
}

async function fetchAllCitiesByRegionId(id) {
    const response = await fetch(cityUrl+id)
    return await response.json()
}

function createTableArray (regions, feedbacks) {
    const tableArray = regions.reduce( (acc, regionItem) => {
        const feedbacksCount = feedbacks.filter(item => item.region_id===regionItem.id).length
        if(feedbacksCount!==0){
            return acc.concat({region_id: regionItem.id, region_name: regionItem.name, feedbacks_count: feedbacksCount})
        } else { return acc }
    }, [])

    return tableArray
}

function createCityTableArray (cities, feedbacks) {
    const tableArray = cities.reduce( (acc, cityItem) => {
        const feedbacksCount = feedbacks.filter(item => item.city_id===cityItem.id).length
        if(feedbacksCount!==0){
            return acc.concat({city_id: cityItem.id, city_name: cityItem.name, feedbacks_count: feedbacksCount})
        } else { return acc }
    }, [])

    return tableArray
} 