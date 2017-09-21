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
  Link
} from 'react-router-dom'

import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import 'sweetalert2/dist/sweetalert2.min.css';
import './statuspage.css'
import 'font-awesome/css/font-awesome.min.css';

const reducers = combineReducers({
  form: formReducer
})

const store = createStore(reducers)

const Footer = () => (
<footer className="footer">
  <div className="container">
    <div className="content has-text-centered">
      <p>
        <strong>Asilah (أسئلة)</strong> by <a href="http://blog.ihfazh.com">Muhammad Ihfazhillah</a>
      </p>
      <p>
        <a className="icon" href="https://github.com/ihfazhillah/asilah">
          <i className="fa fa-github"></i>
        </a>
      </p>
    </div>
  </div>
</footer>
)


const Header = () => (
<nav className="nav section" id="top">
      <div className="nav-left">
        <Link className="nav-item" to="/">
          <h3 className="title">AL ASILAH (الأسئلة)</h3>
        </Link>
      </div>

      <div className="nav-center">
        <a className="nav-item" href="https://github.com/ihfazhillah/asilah">
          <span className="icon">
            <i className="fa fa-github"></i>
          </span>
        </a>
        <a className="nav-item" href="https://facebook.com/mihfazhillah">
          <span className="icon">
            <i className="fa fa-facebook"></i>
          </span>
        </a>
      </div>

      <span className="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div className="nav-right nav-menu">
        <Link className="nav-item" to="/">
          Home
        </Link>

        <span className="nav-item">
          <a className="button" href="https://facebook.com/mihfazhillah">
            <span className="icon">
              <i className="fa fa-facebook"></i>
            </span>
            <span>facebook</span>
          </a>
        </span>
      </div>
    </nav>
)


const Main = () => (
  <ApolloProvider client={client} store={store}>
    <Router >
      <div>
        <Header/>
        <Route exact path="/" component={Home}/>
        <Route path="/question/:slug" component={SingleQuestion}/>
        <Footer/>
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(
  <Main/>,
  document.getElementById('root'));
registerServiceWorker();
