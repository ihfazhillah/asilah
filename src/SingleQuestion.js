import React from 'react'
import {graphql, gql} from 'react-apollo'
import _ from 'lodash';
import {Field, reduxForm} from 'redux-form'
import swal from 'sweetalert2';
import Halogen from 'halogen'
import DocumentTitle from 'react-document-title';

const ChoicesRadioTemplate = ({choices, questionId}) => (
  <div>
    {
      _.map(choices, (choice, index) => (
        <div className="control" key={index} style={{color: 'black'}}>
        <label className="radio">
          <Field component='input' type="radio" name={questionId} value={choice.id.toString()}/> {choice.answer}
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
        <label className="checkbox">
          <Field component='input' type="checkbox" name={questionId + "." + choice.id}/> {choice.answer}
        </label>
      </div>
      ))
    }
  </div>
)

const QuestionsTemplate = ({questions, postLoading, result, onSubmit, handleSubmit, reset}) => (
<article className="tile is-child notification is-info">
  <form onSubmit={handleSubmit(onSubmit)}>
        <p className="title">Soal</p>
        {postLoading?
            <Halogen.BeatLoader/>
            :
            <div>
              {
                _.map(questions, (q, i) => (
                  <div style={{backgroundColor: result[q.node.id] || result[q.node.id] === undefined ? "" : "#ff3860"}} className="box" key={i}>
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
              <button className="button">Submit</button>
              <button className="button is-danger is-pulled-right" onClick={(e) => {e.preventDefault();reset()}}>Reset</button>
            </div>
        }

      </form>
      </article>
)

class SingleQuestion extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      result : {},
    }

    this.ayoKoreksi = this.ayoKoreksi.bind(this)
  }

  ayoKoreksi(value){
    let questions = this.props.post.questions

    let answers = {}
    _.forEach(questions.edges, item => {
      answers[item.node.id] = item.node.answer
    });

    let userAnswers = {}
    _.forIn(value, (val, key) => {
      if(_.isString(val)){
        userAnswers[key] = [val];
      } else{
        userAnswers[key] = _.keys(val)
      }
    })

    let result = _.mapValues(answers, (val, key) => {
      return _.isEqual(_.sortBy(answers[key], v=>v), _.sortBy(userAnswers[key], v => v))
    })

    this.setState({result: result})

    let correctCount = _.size(_.filter(result, (v) => v))
    let questionsCount = _.size(questions.edges)
    let score = 100/questionsCount*correctCount

    swal({
      title: "Score Pertanyaan",
      html: `Jumlah Pertanyaan: ${questionsCount}<br>
      Jumlah Benar: ${correctCount}<br>
      Score: ${score}
      `,
      type: score > 50 ? "success" : "error",
    })

  }

  render(){
    let {
      post,
      handleSubmit,
      postLoading,
      reset
    } = this.props
    return (
      <DocumentTitle title={(!postLoading && post.title) || "Untitled"}>
      <div className="section">
      <div className="tile is-ancestor">
        <div className="tile is-parent  column is-4">
          <article className="tile is-child notification is-primary">
            {postLoading?
                <Halogen.BeatLoader/>
                :
                <div>
                  <p className="title">{post.title}</p>
                  <p>{post.content}</p>
                </div>
              }
          </article>
        </div>
        <div className="tile is-parent column is-8">
            <QuestionsTemplate
              questions={post.questions && post.questions.edges}
              handleSubmit={handleSubmit}
              onSubmit={this.ayoKoreksi}
              result={this.state.result}
              postLoading={postLoading}
              reset={reset}
            />

        </div>
      </div>
      </div>
    </DocumentTitle>
    )
  }
}

SingleQuestion = reduxForm({
  form: 'question'
})(SingleQuestion)

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
