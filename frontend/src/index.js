import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from 'store';
import 'antd/dist/antd.min.css';
import './index.css';
import Root from "pages";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <Root />
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>
);
