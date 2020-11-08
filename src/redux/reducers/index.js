import { combineReducers } from 'redux'
import feedbackReducer from './FeedbackReducer'
import formReducer from './formReducer'
import stateTableReducer from './stateTableReducer'

const rootReducer = combineReducers({feedbackReducer: feedbackReducer, formReducer: formReducer, tableReducer: stateTableReducer})

export default rootReducer