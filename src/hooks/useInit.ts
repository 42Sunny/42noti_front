import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { useEffect } from 'react';

const initSentry = () => {
  if (process.env.REACT_APP_ENV !== 'local') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      environment: process.env.REACT_APP_ENV,
      tracesSampleRate: 1.0,
    });
  }
};

const useInit = () => {
  useEffect(() => {
    initSentry();
  }, []);
};

export default useInit;
