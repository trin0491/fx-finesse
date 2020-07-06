import { Injectable } from '@angular/core';
import {SerialPortChannelClient} from './serial-port-channel-client';

@Injectable({
  providedIn: 'root'
})
export class SerialPortService {

  private client: Promise<SerialPortChannelClient>;

  constructor() {
    this.client = SerialPortChannelClient.makeClient();
  }

  getPorts(): Promise<string[]> {
    return this.client.then((client: SerialPortChannelClient) => {
      return client.getPorts();
    });
  }
}
