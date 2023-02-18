import './index.css';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import AppContextProvider from './context';
import ReactDOM from 'react-dom/client';
import { YogaLink } from '@graphql-yoga/apollo-link';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

const client = new ApolloClient({
  link: new YogaLink({
    endpoint: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContextProvider>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </AppContextProvider>
);
