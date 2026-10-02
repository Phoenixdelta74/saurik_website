import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const appElement = (
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    try {
      ReactDOM.hydrateRoot(rootElement, appElement, {
        onRecoverableError(error, errorInfo) {
          console.warn('Hydration recoverable warning:', error, errorInfo);
        },
      });
    } catch (err) {
      console.error('Fatal hydration error encountered, falling back to fresh client render:', err);
      ReactDOM.createRoot(rootElement).render(appElement);
    }
  } else {
    ReactDOM.createRoot(rootElement).render(appElement);
  }
}

