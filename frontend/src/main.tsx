import React from 'react'
import { createRoot } from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import './style.css'
import App from './App'
import { Theme } from '@radix-ui/themes';

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <Theme>
            <App />
        </Theme>
    </React.StrictMode>
)
