import { ipcMain, Menu } from 'electron';

const songMenu = Menu.buildFromTemplate([
  { label: 'Go to artist' },
  { label: 'Go to album' },
  { type: 'separator' },
  { label: 'Copy' },
  { label: 'Copy title' },
  { label: 'Copy artist' },
]);

const menus = {
  songMenu,
};

export type MenuKey = keyof typeof menus;

export const handleContextMenus = () => {
  ipcMain.on('showContextMenu', (_, menu: MenuKey) => menus[menu]?.popup());
};
