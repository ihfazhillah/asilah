import React from 'react'
import {graphql, gql} from 'react-apollo'
import _ from 'lodash';
import './statuspage.css'

const ChoicesRadioTemplate = ({choices, questionId}) => (
  <div>
    {
      _.map(choices, (choice, index) => (
        <div className="control" key={index} style={{color: 'black'}}>
        <label className="radio">
          <input type="radio" name={questionId}/> {choice.answer}
        </label>
      </div>
      ))
    }
  </div>
)
const ChoicesCheckboxTemplate = ({choices, questionId}) => (
  <div>
    {
      _.map(choices, (choice, index) => (
        <div className="control" key={index} style={{color: 'black'}}>
        <label className="radio">
          <input type="checkbox" name={questionId}/> {choice.answer}
        </label>
      </div>
      ))
    }
  </div>
)

const QuestionsTemplate = ({questions}) => (
<article className="tile is-child notification is-info">
        <p className="title">Soal</p>

        {
          _.map(questions, (q, i) => (
            <div className="box" key={i}>
              <strong>{i+1}. {q.node.question}</strong>
              <br/>
              <br/>
              {q.node.type === 'one' ?
              <ChoicesRadioTemplate 
                choices={q.node.choices}
                questionId={q.node.id}
              />:
                  <ChoicesCheckboxTemplate
                    choices={q.node.choices}
                    questionId={q.node.id}
                  />
              }
            </div>
          ))
        }
      </article>
)

let SingleQuestion = ({match, post}) => (
  <div className="tile is-ancestor">
    <div className="tile is-parent  column is-4">
      <article className="tile is-child notification is-primary">
        <p className="title">{post.title}</p>
        <p>{post.content}</p>
      </article>
    </div>
    <div className="tile is-parent column is-8">
      <QuestionsTemplate
        questions={post.questions && post.questions.edges}
      />
    </div>
  </div>
)

let query = gql`
query ($slug: String!){
  viewer{
  allPosts(where: {slug: {eq: $slug}}){
    edges{
      node{
        id
        title
        content
        type
        questions{
          edges{
            node{
              id
              question
              choices
              type
              answer
            }
          }
        }
      }
    }
    
  }}
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
      let post = _.first(data.viewer.allPosts.edges);
      post = post.node
      debugger

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
