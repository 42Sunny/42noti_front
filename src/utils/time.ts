import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Event } from '../types/event';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const timeFormat = (beginAt: string) => {
  let time;
  const beginTime = dayjs(beginAt);
  const now = dayjs();
  const todayMidnight = now.endOf('date');
  const tomorrowMidnight = todayMidnight.add(1, 'day');
  const thisWeekend = now.endOf('week');

  if (beginTime.isAfter(now) && beginTime.isSameOrBefore(todayMidnight)) {
    time = beginTime.format('오늘 A h:mm');
  } else if (
    beginTime.isAfter(todayMidnight) &&
    beginTime.isSameOrBefore(tomorrowMidnight)
  ) {
    time = beginTime.format('내일 A h:mm');
  } else if (
    beginTime.isAfter(tomorrowMidnight) &&
    beginTime.isSameOrBefore(thisWeekend)
  ) {
    time = beginTime.format('이번 주 DDDD h:mm');
  } else if (beginTime.isSame(now, 'year')) {
    time = beginTime.format('M월 D일 A h:mm');
  } else {
    time = beginTime.format('YYYY년 M월 D일 A h:mm');
  }
  return time;
};

export const endAtFormat = (beginAt: string, endAt: string) => {
  let time;
  const beginTime = dayjs(beginAt);
  const endTime = dayjs(endAt);

  if (endTime.format('a') === beginTime.format('a')) {
    time = endTime.format('h:mm');
  } else if (endTime.isSame(beginTime, 'day')) {
    time = endTime.format('A h:mm');
  } else if (endTime.isSame(beginTime, 'month')) {
    time = endTime.format('D일 A h:mm');
  } else if (endTime.isSame(beginTime, 'year')) {
    time = endTime.format('M월 D일 A h:mm');
  } else {
    time = endTime.format('YY년 M월 D일 A h:mm');
  }
  return time;
};

export const handleKRDiffTime = (stringDate: string): Date => {
  //js 의 new Date 자체에서 로컬시간으로 변경해서 + 9 시간 해주기 때문에 -9시간 해서 보내줌
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return new Date(new Date(stringDate).getTime() - KR_TIME_DIFF);
};

export const filterUpcomingEvents = (events: Array<Event>): Array<Event> => {
  const upcomingEvents = events.filter((event) => {
    const date = event?.beginAt.split('T')[0];
    const today = new Date();
    today.setHours(24, 0, 0, 0);
    return new Date(date).getTime() >= today.getTime();
  });
  return upcomingEvents;
};

export const filterUpdatedEvents = (events: Array<Event>): Array<Event> => {
  //오늘 업데이트 된 일정들
  const lastMidnight = new Date();
  const now = new Date();
  lastMidnight.setHours(0, 0, 0, 0);
  const updatedEvents = events.filter((event) => {
    //const updated = new Date(event.updatedAt);
    //const created = new Date(event.createdAt);
    const updated = handleKRDiffTime(event.updatedAt);
    const created = handleKRDiffTime(event.createdAt);

    //자정 후에 업데이트가 되고, 생성날짜보다 업데이트 날짜가 최신일때, 지금은 더미데이터로 인해서 미래업데이트 날짜가 들어가면 (-)가 나오니까 지금보다 전에 일정만
    return lastMidnight < updated && created < updated && updated < now;
  });
  return updatedEvents;
};
