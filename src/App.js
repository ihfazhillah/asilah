import React, { Component } from 'react';
import logo from './logo.svg';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom';
import './statuspage.css'

const ItemList = (props) => (
  <div>
    <div className="api">
      <div className="label"><Link to={"/question/" + props.slug}>{props.title}</Link></div>
      <div className="has-text-weight-light">{props.content}</div>
    </div>
    <hr/>
  </div>
)

class Home extends Component {
  render() {
    return (
      <div className="section">
        <div className="status-list">
          {this.props.posts.map((post, index) => (
            <ItemList
              title={post.title}
              content={post.content}
              slug={post.slug}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}
Home = graphql(gql`
query{
  allPosts{
    slug
    content
    title
    createdAt
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
})(Home)
export default Home;
