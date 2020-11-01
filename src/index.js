import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

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