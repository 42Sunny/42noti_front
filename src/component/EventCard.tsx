import React from 'react';

export const EventCard = (events: any) => {
  return events.map((event: any) => {
    return (
      <>
        <div>{event.date.split('-')[1]}</div>
        <div>{event.title}</div>
        <div>{event.location}</div>
      </>
    );
  });
};
