import React from 'react'
import {graphql, gql} from 'react-apollo'
import _ from 'lodash';
import './statuspage.css'

let SingleQuestion = ({match, post}) => (
  <div className="tile is-ancestor">
    <div className="tile is-parent  column is-4">
      <article className="tile is-child notification is-primary">
        <p className="title">{post.title}</p>
        <p>{post.content}</p>
      </article>
    </div>
    <div className="tile is-parent column is-8">
      <article className="tile is-child notification is-info">
        <p className="title">Soal</p>

        {
          _.map(post.questions, (q, i) => (
            <div className="box">
              <strong>{i+1}. {q.question}</strong>
              <br/>
              <br/>
              {
                _.map(q.choices, (c, j) => (
                  <div className="control" key={j} style={{color: 'black'}}>
                  <label className="radio">
                    <input type="radio" name={q.id}/> {c.answer}
                  </label>
                </div>
                ))
              }
            </div>
          ))
        }
      </article>
    </div>
  </div>
)

let query = gql`
query ($slug: String!){
  allPosts(filter: {slug: $slug}){
    title
    content
    id
    createdAt
    questions{
      id
      question
      choices
      answer
    }
  }
}
`

SingleQuestion = graphql(query, {
  options: (ownProps) => ({
    variables: {
      slug: ownProps.match.params.slug
    }
  }),
  props: ({ownProps, data}) => {
    if (!data.loading) {
      let post = _.first(data.allPosts);

      return {
        post,
        postLoading: false
      }
    }

    return {
      postLoading: true,
      post: {}
    }
  }
})(SingleQuestion)



export default SingleQuestion
