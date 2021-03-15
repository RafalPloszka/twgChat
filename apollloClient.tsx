import { ApolloClient, createHttpLink, InMemoryCache,  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import { hasSubscription } from '@jumpn/utils-graphql';
import { split } from '@apollo/client/link/core';
import { TOKEN, API_URL, WSS } from 'react-native-dotenv';

const httpLink = createHttpLink({
  uri: API_URL
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: TOKEN ? `Bearer ${TOKEN}` : ""
    }
  };
});

const authedHttpLink = authLink.concat(httpLink);


const phoenixSocket = new PhoenixSocket(WSS, {
  params: () => {
    return { token: TOKEN }
  }
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const websocketLink = createAbsintheSocketLink(absintheSocket);

const link = split(
  operation => hasSubscription(operation.query),
  websocketLink,
  authedHttpLink
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache
});