import axios from 'axios';

// const API_URL = 'https://test-42meetup.herokuapp.com/';
// const API_URL = 'http://3.38.119.49/';
const API_URL = 'http://api.event.42cadet.kr';

const instance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});

export const getEvents = () => {
  return instance.get('/api/events');
};

export const getEvent = (eventId: number) => {
  return instance.get(`/api/event/${eventId}`);
};

export const getUserEvents = (userId: string) => {
  return instance.get(`/api/user/${userId}/events`);
};
