import { JSX } from 'preact';
import { useState } from 'preact/hooks';

import { router } from './router';
import { TitleBar } from './components/TitleBar';
import { MainNavigation } from './components/MainNavigation';
import { Player } from './components/Player';
import classes from './App.module.css';

import { Artists } from './pages/Artists';
import { Albums } from './pages/Albums';
import { Songs } from './pages/Songs';
import { Settings } from './pages/Settings';

const routes: Record<string, JSX.Element> = {
  artists: <Artists />,
  albums: <Albums />,
  songs: <Songs />,
  settings: <Settings />,
};

const Page = ({ route }: { route: string }) => routes[route] || <>404</>;

export const App = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  router.on('*', setCurrentRoute);

  return (
    <>
      <TitleBar />
      <MainNavigation />
      <main class={classes.main}>
        <Page route={currentRoute} />
      </main>
      <Player />
    </>
  );
};
