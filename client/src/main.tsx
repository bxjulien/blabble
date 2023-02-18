import './index.css';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import ReactDOM from 'react-dom/client';
import { YogaLink } from '@graphql-yoga/apollo-link';

const client = new ApolloClient({
  link: new YogaLink({
    endpoint: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
