import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_42EVENT_API_URL,
  withCredentials: true,
});

const DEFAULT_LIMIT = 10;

export const getEventsPagination = (range: string, page: number) => {
  return instance.get(
    `/events?range=${range}&source=42api,admin,cadet,mock&page=${page}&limit=${DEFAULT_LIMIT}`,
  );
};
export const getEvents = () => {
  //return instance.get('/events');
  //42API + 수동으로 추가한 이벤트 가져오기 API
  return instance.get('/events?source=42api,admin,cadet,mock');
};

export const getEventsForce = () => {
  //return instance.get('/events?update=force');

  //42API + 수동으로 추가한 이벤트 가져오기 API
  return instance.get('/events?update=force&source=42api,admin,cadet,mock');
};

export const getEvent = (eventId: number) => {
  return instance.get(`/events/${eventId}`);
};

export const getUserEvents = () => {
  return instance.get(`/users/my/events`);
};

// //로컬에서 작업할때 임시로 사용
// export const getUserEvents = () => {
//   return instance.get(`/users/sarchoi/events`);
// };

export const getAlarmState = (eventId: number) => {
  return instance.get(`/events/${eventId}/reminder`);
};

export const postAlarm = (eventId: number) => {
  return instance.post(`/events/${eventId}/reminder`);
};

export const delAlarm = (eventId: number) => {
  return instance.delete(`/events/${eventId}/reminder`);
};
