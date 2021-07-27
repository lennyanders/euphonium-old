const listenersMap: Record<string, Function[]> = {};

const handleRoute = () => {
  const path = location.hash.slice(1);
  const listeners = listenersMap[path] || listenersMap['*'];
  listeners?.forEach((cb) => cb(path));
};

export const router = {
  go(path: string) {
    location.hash = path;
  },
  on(path: string, callback: (path: string) => void) {
    const listeners = listenersMap[path];
    if (listeners) {
      listeners.push(callback);
    } else {
      listenersMap[path] = [callback];
    }
    handleRoute();
  },
};

window.addEventListener('hashchange', handleRoute);
