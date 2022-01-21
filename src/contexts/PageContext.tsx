import React, { useReducer, useContext, createContext, Dispatch } from 'react';

type Props = {
  children: React.ReactNode;
};
type PageState = { page: number };

type Action = { type: 'ADD_PAGE' };

type PageDispatch = Dispatch<Action>;

const PageStateContext = createContext<PageState | null>(null);
const PageDispatchContext = createContext<PageDispatch | null>(null);

const reducer = (state: PageState, action: Action): PageState => {
  switch (action.type) {
    case 'ADD_PAGE':
      return { page: state.page + 1 };
  }
};

const initialState = {
  page: 0,
};
const PageProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PageStateContext.Provider value={state}>
      <PageDispatchContext.Provider value={dispatch}>
        {children}
      </PageDispatchContext.Provider>
    </PageStateContext.Provider>
  );
};

export const usePageState = () => {
  const PageState = useContext(PageStateContext);
  if (!PageState) throw new Error('Cannot find PageProvider');
  return PageState;
};

export const usePageDispatch = () => {
  const PageDispatch = useContext(PageDispatchContext);
  if (!PageDispatch) throw new Error('Cannot find PageProvider');
  return PageDispatch;
};

export default PageProvider;
