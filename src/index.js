import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'



const store = createStore(rootReducer, applyMiddleware(thunk))

console.log(store)

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