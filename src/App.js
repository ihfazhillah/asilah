import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom';
import _ from 'lodash';
import Halogen from 'halogen'

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
        {this.props.postLoading?
            <Halogen.BeatLoader color="#1fc8db"/>
            :
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
        }
      </div>
    );
  }
}
Home = graphql(gql`
query{
viewer{
  allPosts (where: {type: {eq: "question"}}){
    edges
    {
    node
  {
    slug
    content
    title
    createdAt
  }
}
}
}
}
`, {
  props: ({ownProps, data}) => {
    if (!data.loading) {
      let posts = _.map(data.viewer.allPosts.edges, item => item.node)
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
