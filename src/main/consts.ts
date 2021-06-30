import { join } from 'path';
import { app } from 'electron';

export const isDev = process.env.NODE_ENV === 'development';

export const userDataPath = isDev ? join(process.cwd(), '..', 'userData') : app.getPath('userData');
