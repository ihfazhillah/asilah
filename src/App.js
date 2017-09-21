import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const ItemList = (props) => (
  <div>
    <div className="api">
      <div className="label">{props.title}</div>
      <div className="amount has-text-centered">{props.content}</div>
    </div>
    <hr/>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="section">
        <div className="status-list">
          {this.props.posts.map(post => (
            <ItemList
              title={post.title}
              content={post.content}
            />
          ))}
        </div>
      </div>
    );
  }
}
App = graphql(gql`
query{
  allPosts{
    content
    title
    createdAt
    questions{
      id
      choices
      question
      answer
    }
  }
}
`, {
  props: ({ownProps, data}) => {
    if (!data.loading) {
      let posts = data.allPosts
      let postLoading = data.loading

      return {
        posts,
        postLoading
      }
    } else {
      return {
        postLoading: data.loading,
        posts: []
      }
    }
  }
})(App)
export default App;
