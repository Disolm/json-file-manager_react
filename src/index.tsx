import React from 'react';
import { createRoot } from 'react-dom/client';
import './access/tailwindcss.css';
// import './access/index.css'
import { App } from './App';

const container = document.getElementById("app")  as HTMLElement;
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);