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
  Route,
  Switch
} from 'react-router-dom'

const Main = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/question/:slug" component={SingleQuestion}/>
        </div>
      </Switch>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(
  <Main/>,
  document.getElementById('root'));
registerServiceWorker();
