import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'


let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create() {
  return new ApolloClient({
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      uri: 'https://cn58i0m5nf.execute-api.us-east-1.amazonaws.com/dev/graphql',
      opts: {
        headers: {
          'X-api-key': 'NU3CLquusY7gmh7uvELzU9flihzxjJyy5h0VI1pv',
        }
      }
    })
  })
}

export default function initApollo() {
  if (!process.browser) {
    return create();
  }

  if (!apolloClient) {
    apolloClient = create();
  }

  return apolloClient;
}
