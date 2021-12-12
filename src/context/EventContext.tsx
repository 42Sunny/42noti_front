import { createContext, useContext, useEffect, useReducer, Dispatch } from 'react';
import { getDummy, getDummyDetail } from '../api/api';

type Props = {
  children?: React.ReactNode;
};

export type Event = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  currentSubscribers: number | null;
  maxSubscribers: number | null;
  tags: Array<string>;
  endAt: string;
  beginAt: string;
  createdAt: string;
  updatedAt: string;
};

// 비동기 요청을 위한 타입
type EventsState = {
  events: {
    loading: boolean,
    error: any,
    data: Event[]
  },
  event: {
    loading: boolean,
    error: any,
    data: null | Event 
  }
};

// 액션들을 위한 타입
type Action =
  | { type: 'LOADING_EVENTS' }
  | { type: 'GET_EVENTS'; data: Event[] }
  | { type: 'FAILURE_EVENTS'; error: any }
  | { type: 'LOADING_EVENT' }
  | { type: 'GET_EVENT'; data: Event }
  | { type: 'FAILURE_EVENT'; error: any };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type EventsDispatch = Dispatch<Action>;

//initialState
const initialState = {
  events: {
    loading: false,
    error: null,
    data: []
  },
  event: {
    loading: false,
    error: null,
    data: null,
  }
};

// reducer useReducer 의 인자
const reducer = (state: EventsState, action: Action): EventsState => {
  switch (action.type) {
    case 'LOADING_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          loading: true
        }
      };
    case 'GET_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          data: action.data,
          loading: false,
        }
      };
    case 'FAILURE_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          error: action.error,
          loading: false,
        }
      };
      case 'LOADING_EVENT':
        return {
          ...state,
          event: {
            ...state.event,
            loading: true
          }
        };
      case 'GET_EVENT':
        return {
          ...state,
          event: {
            ...state.event,
            data: action.data,
            loading: false,
          }
        };
      case 'FAILURE_EVENT':
        return {
          ...state,
          event: {
            ...state.event,
            error: action.error,
            loading: false,
          }
        };
    default:
      throw new Error('invalid action type');
  }
};

// Context 만들기
const EventsStateContext = createContext<null | EventsState>(null);
const EventsDispatchContext = createContext<null | EventsDispatch>(null);

// API를 요청하는 함수
export const getEvents = async (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: 'LOADING_EVENTS' });
  try {
    const response = await getDummy();
    const sorteddata = response.data.data.sort((a: Event, b: Event) => {
      return a.id - b.id;
    });
    dispatch({ type: 'GET_EVENTS', data: sorteddata });
  } catch (e) {
    dispatch({ type: 'FAILURE_EVENTS', error: e });
  }
};

export const getEvent = async (dispatch: React.Dispatch<Action>, eventId: number) => {
  dispatch({ type: 'LOADING_EVENT' });
  try {
    const response = await getDummyDetail(eventId);
    dispatch({ type: 'GET_EVENT', data: response.data });
  } catch (e) {
    dispatch({ type: 'FAILURE_EVENT', error: e });
  }
};

// provider 반환
export const EventProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getEvents(dispatch);
  }, []);

  return (
    <EventsStateContext.Provider value={state}>
      <EventsDispatchContext.Provider value={dispatch}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsStateContext.Provider>
  );
};

// state, dispatch 를 잘 쓰기위한 커스텀 hook
export const useEventsState = () => {
  const EventsState = useContext(EventsStateContext);
  if (!EventsState) throw new Error('Cannot find ClusterProvider'); 
  return EventsState;
};

export const useEventsDispatch = () => {
  const EventsDispatch = useContext(EventsDispatchContext);
  if (!EventsDispatch) throw new Error('Cannot find ClusterProvider');
  return EventsDispatch;
};