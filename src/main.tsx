import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@total-typescript/ts-reset';

import { mockServer } from '@phantombuster/kernel/mock-server';

import { App } from './app/app';
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
