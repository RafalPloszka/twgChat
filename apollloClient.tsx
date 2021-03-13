import { ApolloClient, createHttpLink, InMemoryCache,  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import { hasSubscription } from '@jumpn/utils-graphql';
import { split } from '@apollo/client/link/core';
// import Cookies from 'js-cookie';

// Temporary hardcoded token
const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MTczNjM2NzAsImlhdCI6MTYxNDk0NDQ3MCwiaXNzIjoiY2hhdGx5IiwianRpIjoiOWRjY2FkZjYtNTFiYy00MDdiLTkyOTQtNDc5OTZhZWMxNWNlIiwibmJmIjoxNjE0OTQ0NDY5LCJzdWIiOiIxNTAxNzZjZS1kOTc2LTRlM2MtOGY0NC0wMDU1MGNlYmI0Y2YiLCJ0eXAiOiJhY2Nlc3MifQ.vcmBCaPTGLORbowSczdcjVmWIdrFviRFCLXxjoO5tDaJyJMyHY3VqvUUimVli_msfVAzpOe8_MQUQj5Pl0SsuQ';

const httpLink = createHttpLink({
  uri: 'https://chat.thewidlarzgroup.com/api/graphiql'
});

const authLink = setContext((_, { headers }) => {
  // const token = Cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const authedHttpLink = authLink.concat(httpLink);


const phoenixSocket = new PhoenixSocket("ws://localhost:4000/socket", {
  params: () => {
    return { token: token }
    // if (Cookies.get("token")) {
    //   return { token: Cookies.get("token") };
    // } else {
    //   return {};
    // }
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