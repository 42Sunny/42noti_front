import React from 'react';
import EventProvider from 'contexts/EventContext';
import UserProvider from 'contexts/UserContext';
import GlobalStyles from 'styles/Globalstyles';

type Props = {
  children: React.ReactNode | JSX.Element | JSX.Element[] | string;
};

const StyleProviders = ({ children }: Props) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};
const Providers = ({ children }: Props) => {
  return (
    <UserProvider>
      <EventProvider>
        <StyleProviders>{children}</StyleProviders>
      </EventProvider>
    </UserProvider>
  );
};

export default Providers;
