import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@total-typescript/ts-reset';

import { mockServer } from '@phantombuster/kernel/mock-server';

import { App } from './app/app';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

mockServer();

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
