import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getEventsPagination } from '../api/api';
//import { usePageDispatch, usePageState } from '../contexts/PageContext';
import EventCard from './EventCard';

const getDummies = () => [
  {
    id: 66,
    intraId: 8770,
    title: '[6기1차] Exam02 운영 봉사단 모집',
    description:
      '6기 1차 Exam02 운영 봉사단을 모집합니다. \r\n\r\n아래 내용확인 후 봉사단을 신청해주시기 바랍니다. \r\n\r\n6기 1차 Exam02 운영\r\n\r\n- 일정 : 1.21(금). 12:00 ~ 18:00 (exam시간 :13:00~17:00)\r\n\r\n- 장소 : 서초 클러스터\r\n\r\n- 피씨너 분들에게 동선 및 간단한 시스템 안내 등을 하는 역할 입니다.\r\n\r\n- 12시에 모여서 오리엔테이션 후 진행\r\n\r\n- 1/20(목) 12:00 이후는 취소가 불가능합니다.\r\n\r\n일정을 꼭 확인하고 신청해주세요. \r\n\r\ntrace 없어서 통곡 하던 exam 02의 결심을 기억하며 봉사 부탁드려요 :-) \r\n\r\n봉사 참여 시 소정의 월렛 포인트가 지급됩니다. (시간당 2월렛 지급 예정)',
    location: '서초 클러스터',
    category: 'event',
    maxSubscribers: 10,
    currentSubscribers: 10,
    beginAt: '2022-01-21T03:00:00.000Z',
    endAt: '2022-01-21T09:00:00.000Z',
    tags: [],
    createdAt: '2022-01-20T01:00:13.051Z',
    updatedAt: '2022-01-20T02:10:02.313Z',
    source: '42api',
  },
  {
    id: 65,
    intraId: 87701,
    title: '테스트',
    description:
      'markdown 형식으로 작성 가능합니다.\r\n링크 : https://example.com\r\n\r\n1. 숫자 리스트\r\n2. 숫자 리스트\r\n- 리스트\r\n- 리스트\r\n',
    location: '테스트 장소',
    category: 'event',
    maxSubscribers: null,
    currentSubscribers: 0,
    beginAt: '2022-01-19T16:18:00.000Z',
    endAt: '2022-01-20T11:00:00.000Z',
    tags: ['태그1', '태그2'],
    createdAt: '2022-01-19T16:12:01.000Z',
    updatedAt: '2022-01-19T16:12:01.000Z',
    source: 'mock',
  },
  {
    id: 61,
    intraId: 87702,
    title: '테스트1',
    description:
      'markdown 형식으로 작성 가능합니다.\r\n링크 : https://example.com\r\n\r\n1. 숫자 리스트\r\n2. 숫자 리스트\r\n- 리스트\r\n- 리스트\r\n',
    location: '테스트 장소',
    category: 'event',
    maxSubscribers: null,
    currentSubscribers: 0,
    beginAt: '2022-01-19T16:03:00.000Z',
    endAt: '2022-01-20T11:00:00.000Z',
    tags: ['태그1', '태그2'],
    createdAt: '2022-01-19T15:50:30.000Z',
    updatedAt: '2022-01-19T15:50:30.000Z',
    source: 'mock',
  },
  {
    id: 62,
    intraId: 87703,
    title: '테스트2',
    description:
      'markdown 형식으로 작성 가능합니다.\r\n링크 : https://example.com\r\n\r\n1. 숫자 리스트\r\n2. 숫자 리스트\r\n- 리스트\r\n- 리스트\r\n',
    location: '테스트 장소',
    category: 'event',
    maxSubscribers: null,
    currentSubscribers: 0,
    beginAt: '2022-01-19T16:03:00.000Z',
    endAt: '2022-01-20T11:00:00.000Z',
    tags: ['태그1', '태그2'],
    createdAt: '2022-01-19T15:50:32.000Z',
    updatedAt: '2022-01-19T15:50:32.000Z',
    source: 'mock',
  },
  {
    id: 64,
    intraId: 87704,
    title: '테스트',
    description:
      'markdown 형식으로 작성 가능합니다.\r\n링크 : https://example.com\r\n\r\n1. 숫자 리스트\r\n2. 숫자 리스트\r\n- 리스트\r\n- 리스트\r\n',
    location: '테스트 장소',
    category: 'event',
    maxSubscribers: null,
    currentSubscribers: 0,
    beginAt: '2022-01-19T16:00:00.000Z',
    endAt: '2022-01-20T11:00:00.000Z',
    tags: ['태그1', '태그2'],
    createdAt: '2022-01-19T15:53:42.000Z',
    updatedAt: '2022-01-19T15:53:42.000Z',
    source: 'mock',
  },
  {
    id: 63,
    intraId: 87705,
    title: '테스트',
    description:
      'markdown 형식으로 작성 가능합니다.\r\n링크 : https://example.com\r\n\r\n1. 숫자 리스트\r\n2. 숫자 리스트\r\n- 리스트\r\n- 리스트\r\n',
    location: '테스트 장소',
    category: 'event',
    maxSubscribers: null,
    currentSubscribers: 0,
    beginAt: '2022-01-19T15:00:00.000Z',
    endAt: '2022-01-20T11:00:00.000Z',
    tags: ['태그1', '태그2'],
    createdAt: '2022-01-19T15:53:24.000Z',
    updatedAt: '2022-01-19T15:53:24.000Z',
    source: 'mock',
  },
  {
    id: 48,
    intraId: 8723,
    title: '🌼 [4시] 42서울 교육공간 설문조사 🌼',
    description:
      '🖥 새로운 클러스터 공간 🖥 구축을 위해\r\n클러스터에 대한 여러분의 소중한 의견을 듣고자합니다🕊',
    location: '새롬관 1층 오픈스튜디오',
    category: 'event',
    maxSubscribers: 30,
    currentSubscribers: 18,
    beginAt: '2022-01-19T07:00:00.000Z',
    endAt: '2022-01-19T07:59:00.000Z',
    tags: [],
    createdAt: '2022-01-17T01:07:52.273Z',
    updatedAt: '2022-01-19T06:51:24.481Z',
    source: '42api',
  },
  {
    id: 32,
    intraId: 8653,
    title: '월간 월렛상점(15:00~17:30)',
    description:
      '2022년 첫번째 월렛상점입니다.\r\n신제품 입고 전까지 당분간 월렛상점은 월간으로 진행됩니다!\r\n15:00~17:30까지 운영시간을 확대하여 운영함에 따라 편하신 시간에 방문해주세요!\r\n**오픈시간에 오시면 오히려 대기줄이 상당할 수 있으니 여유있게 방문해주세요:)**\r\n\r\n사이즈가 있는 의류의 경우 사이즈가 없는 상품들이 있기 때문에 현장에서 재고 확인 후 구매하시기 바랍니다! \r\n\r\n★ 품절 상품 안내: 바람막이(L), 네이비 티셔츠(L), 기모팬츠(전체 사이즈 품절), 스티커 \r\n\r\n☆ 후드집업 잔여 사이즈: S, M (그 외 사이즈 품절) \r\n\r\n▶ 인트라 프로필 사진 및 이모지 제출처: 슬랙 @42s_Luna (월렛상점 오픈 시간에 제출해주시면 처리해드릴 예정입니다!) \r\n\r\n▶ 환불 요청: 슬랙 @42s_holly (기존 구매하신 분 중 재고가 없어 수령이 어려운 분들께서는 월렛상점 오픈 시간에 제출해주시면 환불 처리해드릴 예정입니다!) \r\n\r\n감사합니다.',
    location: '1st planet 새롬관 1층 오픈 라운지',
    category: 'event',
    maxSubscribers: null,
    currentSubscribers: 79,
    beginAt: '2022-01-19T06:00:00.000Z',
    endAt: '2022-01-19T08:30:00.000Z',
    tags: [],
    createdAt: '2022-01-10T08:48:43.669Z',
    updatedAt: '2022-01-19T05:53:08.282Z',
    source: '42api',
  },
  {
    id: 46,
    intraId: 8722,
    title: '🥂 [3시] 42서울 교육공간 설문조사 🥂',
    description:
      '🖥 새로운 클러스터 공간 🖥 구축을 위해\r\n클러스터에 대한 여러분의 소중한 의견을 듣고자합니다🕊',
    location: '새롬관 1층 오픈스튜디오',
    category: 'event',
    maxSubscribers: 30,
    currentSubscribers: 24,
    beginAt: '2022-01-19T06:00:00.000Z',
    endAt: '2022-01-19T06:59:00.000Z',
    tags: [],
    createdAt: '2022-01-17T01:07:00.754Z',
    updatedAt: '2022-01-19T05:55:17.250Z',
    source: '42api',
  },
  {
    id: 47,
    intraId: 8721,
    title: '✨[2시] 42서울 교육공간 설문조사 ✨',
    description:
      '🖥 새로운 클러스터 공간 🖥 구축을 위해\r\n클러스터에 대한 여러분의 소중한 의견을 듣고자합니다🕊',
    location: '새롬관 1층 오픈스튜디오',
    category: 'event',
    maxSubscribers: 30,
    currentSubscribers: 29,
    beginAt: '2022-01-19T05:00:00.000Z',
    endAt: '2022-01-19T05:59:00.000Z',
    tags: [],
    createdAt: '2022-01-17T01:06:14.456Z',
    updatedAt: '2022-01-19T04:37:36.262Z',
    source: '42api',
  },
];

const PastedEvents = () => {
  //const { page } = usePageState();
  const [page, setPage] = useState(1);
  //const dispatch = usePageDispatch();

  const { ref, inView } = useInView({ trackVisibility: true, delay: 100 });
  const [loading, setLoading] = useState(false);
  const [pastedEvents, setPastedEvents] = useState<
    ReturnType<typeof getDummies>
  >([]);

  const getEvents = useCallback(async () => {
    setLoading(true);
    const response = await getEventsPagination('past', page);
    setPastedEvents(response.data);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      //dispatch({ type: 'ADD_PAGE' });
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);
  return (
    <div>
      {pastedEvents.map((event) => {
        return <EventCard event={event} />;
      })}
      <div ref={ref}>Element {inView.toString()}</div>
    </div>
  );
};

export default PastedEvents;
