import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga' 
import { sagaWatcher } from './redux/sagas'

const saga = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(thunk, saga))

saga.run(sagaWatcher)

const Index = () => {
    return(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))