import { JSX, RefObject, createContext } from 'preact';
import { useState, useRef } from 'preact/hooks';

import { router } from './router';
import { TitleBar } from './components/TitleBar';
import { MainNavigation } from './components/MainNavigation';
import { Player } from './components/Player';
import classes from './App.module.css';

import { Artists } from './pages/Artists';
import { Artist } from './pages/Artist';
import { Albums } from './pages/Albums';
import { Songs } from './pages/Songs';
import { Settings } from './pages/Settings';

const routes: Record<string, JSX.Element> = {
  '/artists': <Artists />,
  '/artist': <Artist />,
  '/albums': <Albums />,
  '/songs': <Songs />,
  '/settings': <Settings />,
};

const Page = ({ route }: { route: string }) => routes[route] || <>404</>;

export const MainRef = createContext<RefObject<HTMLElement> | null>(null);

export const App = () => {
  const mainRef = useRef<HTMLElement>(null);
  const [currentRoute, setCurrentRoute] = useState('');
  router.on('*', setCurrentRoute);

  return (
    <MainRef.Provider value={mainRef}>
      <TitleBar />
      <MainNavigation />
      <main class={classes.main} ref={mainRef}>
        <Page route={currentRoute} />
      </main>
      <Player />
    </MainRef.Provider>
  );
};
