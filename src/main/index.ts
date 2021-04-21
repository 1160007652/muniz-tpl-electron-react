'use strict';

/*

  Main process entry file
  Electron will restart when saving this file
  AppManager is responsible for managing the entire app

*/

import AppManager from '_src/main/managers/app';

new AppManager();

// const app = new AppManager();

/* You can access appManager with electron remote from renderer process (React) */
// global['appManager'] = app;

// export default app;
