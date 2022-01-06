import axios from 'axios';

// const API_URL = 'https://test-42meetup.herokuapp.com/';
// const API_URL = 'http://3.38.119.49/';
const API_URL = 'http://api.event.42cadet.kr';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getEvents = () => {
  return instance.get('/events');
};

export const getEvent = (eventId: number) => {
  return instance.get(`/event/${eventId}`);
};

export const getUserEvents = () => {
  return instance.get(`/users/my/events`);
};

// 로컬에서 작업할때 임시로 사용
// export const getUserEvents = () => {
//   return instance.get(`/users/sarchoi/events`);
// };

