import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "../src/components/App/App";
import "./index.css";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
