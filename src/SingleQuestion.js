import React from 'react'
import {graphql, gql} from 'react-apollo'


const SingleQuestion = ({match}) => (
  <p>Hello world {match.params.slug}</p>
)

export default SingleQuestion
