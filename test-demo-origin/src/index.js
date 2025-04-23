import React from 'react';
import { createRoot } from 'react-dom/client';
import MyLazyApp from './CustomLazy/MyLazyApp';
import ReactActivationApp from './CustomReactActivation/ReactActivationApp';
import './index.css';

const root = createRoot(document.getElementById('root'));
// root.render(<MyLazyApp />);
root.render(<ReactActivationApp />);
