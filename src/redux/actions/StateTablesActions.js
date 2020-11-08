export function feedbacksByRegions () {
    return { type: "FEEDBACKS_BY_REGIONS"}
}

export function feedbacksByRegionId (id) {
    return { type: "FEEDBACKS_BY_REGION_ID", id: id}
}