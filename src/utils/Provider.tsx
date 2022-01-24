import React from 'react';
import EventProvider from '../contexts/EventContext';
import UserProvider from '../contexts/UserContext';

type Props = {
  children: React.ReactNode;
};
const Provider = ({ children }: Props) => {
  return (
    <UserProvider>
      <EventProvider>{children}</EventProvider>
    </UserProvider>
  );
};

export default Provider;
