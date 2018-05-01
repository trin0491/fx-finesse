import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

try {
  fin.desktop.main(function () {
    initWithOpenFin();
  });
} catch (err) {
  initNoOpenFin();
}

function initWithOpenFin() {
  // Your OpenFin specific code to go here...
  const system = fin.desktop.System;
  system.getAllWindows((windowInfoList) => {
    windowInfoList.forEach((winInfo) => {
      fin.desktop.System.showDeveloperTools(winInfo.uuid, winInfo.mainWindow.name);
    });
  });
}

function initNoOpenFin() {
  // alert("OpenFin is not available - you are probably running in a browser.");
  // Your browser-only specific code to go here...
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


