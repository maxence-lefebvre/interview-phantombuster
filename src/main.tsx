import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';
import { mockServer } from './mock-server';
import './index.css';
import { autoSetDarkTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

autoSetDarkTheme();
mockServer();

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
