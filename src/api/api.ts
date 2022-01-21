import axios from 'axios';

const API_URL = 'http://api.event.42cadet.kr';
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getEvents = () => {
  //return instance.get('/events');
  //42API + 수동으로 추가한 이벤트 가져오기 API
  return instance.get('/events?source=42api,admin,cadet,mock');
};

export const getEventsForce = () => {
  //return instance.get('/events?update=force');

  //  //42API + 수동으로 추가한 이벤트 가져오기 API
  return instance.get('/events?update=force?source=42api,admin,cadet,mock');
};

export const getEvent = (eventId: number) => {
  return instance.get(`/events/${eventId}`);
};

export const getUserEvents = () => {
  return instance.get(`/users/my/events`);
};

// 로컬에서 작업할때 임시로 사용
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
