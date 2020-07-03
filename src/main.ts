import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function initWithOpenFin(): void {
  // Your OpenFin specific code to go here...
  const system = fin.desktop.System;
  system.getAllWindows((windowInfoList) => {
    windowInfoList.forEach((winInfo) => {
      fin.desktop.System.showDeveloperTools(winInfo.uuid, winInfo.mainWindow.name);
    });
  });
}

if (typeof fin !== 'undefined') {
  fin.desktop.main(() => {
    initWithOpenFin();
  });
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
