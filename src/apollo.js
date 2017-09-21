import {ApolloClient, createNetworkInterface} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: "https://us-west-2.api.scaphold.io/graphql/asilah"
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

export default client;

