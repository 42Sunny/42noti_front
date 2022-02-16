import React from 'react';
import EventProvider from 'contexts/EventContext';
import UserProvider from 'contexts/UserContext';
import GlobalStyles from 'styles/Globalstyles';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

import { store } from 'app/store';
import { Provider } from 'react-redux';

type Props = {
  children: React.ReactNode | JSX.Element | JSX.Element[] | string;
};

const StyleProviders = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <UserProvider>
        <EventProvider>
          <StyleProviders>{children}</StyleProviders>
        </EventProvider>
      </UserProvider>
    </Provider>
  );
};

export default Providers;
