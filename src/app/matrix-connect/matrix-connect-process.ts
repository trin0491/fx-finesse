
import {Injectable} from '@angular/core';
import Identity = fin.Identity;
import ChannelClient = fin.ChannelClient;

// Avoid global variable reference to openfin API for unit testing purposes
// May be possible to abstract out into DesktopJS but if that is not possible then we should try to minimise the API exposure

@Injectable()
export class MatrixConnectProcess {

  // TODO fix the UUID
  private static readonly UUID = '8651D4BB-5B58-4AE6-9984-3E6DB1641E7D';
  // number of ms to wait for process to exit gracefully before issuing terminate
  private static readonly TERMINATE_TIMEOUT = 3000;

  constructor() {
  }

  start(listener): Promise<Identity> {
    return fin.System.launchExternalProcess({
      path: 'C:\\Users\\rprie\\source\\repos\\SharkFin\\SharkFin\\bin\\Release\\netcoreapp3.1\\publish\\SharkFin.exe',
      arguments: '',
      listener,
      uuid: MatrixConnectProcess.UUID,
      lifetime: 'window'
    });
  }

  stop(): Promise<void> {
    return fin.System.terminateExternalProcess({
      uuid: MatrixConnectProcess.UUID,
      timeout: MatrixConnectProcess.TERMINATE_TIMEOUT,
      killTree: true
    });
  }

  connect(channelName: string): Promise<ChannelClient> {
    return fin.InterApplicationBus.Channel.connect(channelName);
  }

  subscribe<T>(topic: string, callback: (msg: T) => void): Promise<void> {
    return fin.InterApplicationBus.subscribe({uuid: MatrixConnectProcess.UUID}, topic, callback);
  }

  unsubscribe<T>(topic: string, callback: (msg: T) => void): Promise<void> {
    return fin.InterApplicationBus.unsubscribe({uuid: MatrixConnectProcess.UUID}, topic, callback);
  }
}
