import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MTczNjM2NzAsImlhdCI6MTYxNDk0NDQ3MCwiaXNzIjoiY2hhdGx5IiwianRpIjoiOWRjY2FkZjYtNTFiYy00MDdiLTkyOTQtNDc5OTZhZWMxNWNlIiwibmJmIjoxNjE0OTQ0NDY5LCJzdWIiOiIxNTAxNzZjZS1kOTc2LTRlM2MtOGY0NC0wMDU1MGNlYmI0Y2YiLCJ0eXAiOiJhY2Nlc3MifQ.vcmBCaPTGLORbowSczdcjVmWIdrFviRFCLXxjoO5tDaJyJMyHY3VqvUUimVli_msfVAzpOe8_MQUQj5Pl0SsuQ';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
