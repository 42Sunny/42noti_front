import axios from 'axios';

const API_URL = 'https://test-42meetup.herokuapp.com/';

const instance = axios.create({
  baseURL: API_URL,
  //withCredentials: true,
});

export const getDummy = async () => {
  return await instance.get('/dummy');
};
