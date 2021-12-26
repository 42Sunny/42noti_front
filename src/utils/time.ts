import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ko';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('ko');

export const timeFormat = (beginAt: string) => {
  let time;
  const beginTime = dayjs(beginAt);
  const now = dayjs();
  const todayMidnight = dayjs(now).endOf('date');
  const tomorrowMidnight = todayMidnight.add(1, 'day');
  const thisWeekend = dayjs(now).endOf('week');

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
