import { useState } from 'preact/hooks';

import { router } from './router';
import classes from './App.module.css';
import { AppTitleBar } from './components/AppTitleBar';
import { AppMainNavigation } from './components/AppMainNavigation';
import { AppPlayer } from './components/AppPlayer';

import { AppSettings } from './components/AppSettings';
import { AppSongs } from './components/AppSongs';

const Page = ({ route }: { route: string }) => {
  switch (route) {
    case 'settings':
      return <AppSettings />;
    case 'songs':
      return <AppSongs />;
    default:
      return <>404</>;
  }
};

export const App = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  router.on('*', setCurrentRoute);

  return (
    <>
      <AppTitleBar />
      <AppMainNavigation />
      <main class={classes.main}>
        <Page route={currentRoute} />
      </main>
      <AppPlayer />
    </>
  );
};
