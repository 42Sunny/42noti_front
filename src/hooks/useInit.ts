import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { useEffect } from 'react';

const initSentry = () => {
  if (process.env.REACT_APP_ENV !== 'local') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
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
