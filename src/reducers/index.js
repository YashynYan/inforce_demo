import { combineReducers } from 'redux'
import feedbackReducer from './FeedbackReducer'
import formReducer from './formReducer'

const rootReducer = combineReducers({feedbackReducer: feedbackReducer, formReducer: formReducer})

export default rootReducer