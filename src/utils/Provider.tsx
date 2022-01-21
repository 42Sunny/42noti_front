import React from 'react';
import EventProvider from '../contexts/EventContext';
import PageProvider from '../contexts/PageContext';
import UserProvider from '../contexts/UserContext';

type Props = {
  children: React.ReactNode;
};
const Provider = ({ children }: Props) => {
  return (
    <UserProvider>
      <EventProvider>
        <PageProvider>{children}</PageProvider>
      </EventProvider>
    </UserProvider>
  );
};

export default Provider;
