import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Event } from 'types/event';
import 'dayjs/locale/ko';

dayjs.locale('ko');

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
    time = beginTime.format('이번 주 dddd A h:mm');
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

export const filterUpcomingEvents = (
  events: Array<Event> | null,
): Array<Event> => {
  //다가오는 일정들, 지나간 일정을 필터링
  if (events === null) return [];
  const upcomingEvents = events.filter((event) => {
    const now = dayjs();
    const eventDate = dayjs(event.beginAt);
    return eventDate.isAfter(now);
  });
  return upcomingEvents;
};

export const filterPastEvents = (events: Array<Event> | null): Array<Event> => {
  // 지나간 일정들
  if (events === null) return [];
  const pastEvents = events.filter((event) => {
    const now = dayjs();
    const eventDate = dayjs(event.beginAt);
    return eventDate.isBefore(now);
  });
  return pastEvents;
};

export const filterUpdatedEvents = (
  events: Array<Event> | null,
): Array<Event> => {
  //오늘 업데이트 된 일정들
  const horus24 = dayjs().subtract(1, 'day');
  if (events === null) return [];
  const updatedEvents = events.filter((event) => {
    const updated = dayjs(event.updatedAt);
    const created = dayjs(event.createdAt);
    // 생성날짜보다 업데이트 날짜가 최신일때, 24시간전에 업데이트된 이벤트 일때
    return updated.isAfter(created) && updated.isAfter(horus24);
  });
  return updatedEvents;
};

export const isPassed = (beginTime: string) => {
  const now = dayjs();
  const eventDate = dayjs(beginTime);
  return eventDate.isBefore(now);
};

export const handleIsUpdate = (
  updatedAt: string,
  createdAt: string,
  beginAt: string,
) => {
  const now = dayjs();
  const updated = dayjs(updatedAt);
  const created = dayjs(createdAt);
  const begin = dayjs(beginAt);

  if (updated > created && now < begin) return true;
  return false;
};
