import {ApolloClient, createNetworkInterface} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj7tygll5172t0109ayx3zwdz"
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

export default client;

