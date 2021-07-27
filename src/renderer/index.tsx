import type { WindowActions, Settings, AudioData } from '../preload';

declare global {
  interface Window {
    windowActions: WindowActions;
    settings: Settings;
    audioData: AudioData;
  }
}

import { render } from 'preact';
import { App } from './App';
import './global.css';

render(<App />, document.body);
