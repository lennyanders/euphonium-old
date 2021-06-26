import type { WindowActions, Settings } from '../preload';

declare global {
  interface Window {
    windowActions: WindowActions;
    settings: Settings;
  }
}

import './global.css';
import './App';
