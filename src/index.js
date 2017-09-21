import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './App';
import SingleQuestion from './SingleQuestion';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo';
import {ApolloProvider} from 'react-apollo'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Main = () => (
  <ApolloProvider client={client}>
    <Router>
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
