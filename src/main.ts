import 'reflect-metadata';

import { App } from 'app';
import { appBindings, appContainer } from 'appBindings';
import { TYPES } from 'utils/constants';

const boostrap = async (): Promise<void> => {
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.App);

  await app.init();
};

boostrap();
