import React, { useReducer, useContext, createContext, Dispatch } from 'react';

type Props = {
  children: React.ReactNode;
};
type Page = number;

type Action = { type: 'ADD_PAGE' };

type PageDispatch = Dispatch<Action>;

const PageStateContext = createContext<Page | null>(null);
const PageDispatchContext = createContext<PageDispatch | null>(null);

const reducer = (state: Page, action: Action): Page => {
  switch (action.type) {
    case 'ADD_PAGE':
      return state + 1;
  }
};

const PageProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, 0);
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
  if (!PageState) throw new Error('Cannot find UserProvider');
  return PageState;
};

export const usePageDispatch = () => {
  const PageDispatch = useContext(PageDispatchContext);
  if (!PageDispatch) throw new Error('Cannot find UserProvider');
  return PageDispatch;
};

export default PageProvider;
