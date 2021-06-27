import type { WindowActions, Settings, AudioData } from '../preload';

declare global {
  interface Window {
    windowActions: WindowActions;
    settings: Settings;
    audioData: AudioData;
  }
}

import './global.css';
import './App';
