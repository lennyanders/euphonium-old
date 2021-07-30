import { JSX } from 'preact';
import { useState } from 'preact/hooks';

import { router } from './router';
import { TitleBar } from './components/TitleBar';
import { MainNavigation } from './components/MainNavigation';
import { Player } from './components/Player';
import classes from './App.module.css';

import { Settings } from './pages/Settings';
import { Songs } from './pages/Songs';
import { Albums } from './pages/Albums';

const routes: Record<string, JSX.Element> = {
  settings: <Settings />,
  songs: <Songs />,
  albums: <Albums />,
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
