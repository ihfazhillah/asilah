import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './App';
import SingleQuestion from './SingleQuestion';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';
import {ApolloProvider} from 'react-apollo'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import 'sweetalert2/dist/sweetalert2.min.css';
const reducers = combineReducers({
  form: formReducer
})

const store = createStore(reducers)


const Main = () => (
  <ApolloProvider client={client} store={store}>
    <Router >
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/question/:slug" component={SingleQuestion}/>
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(
  <Main/>,
  document.getElementById('root'));
registerServiceWorker();
