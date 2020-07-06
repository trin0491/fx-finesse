import { SerialPortChannelClient } from './serial-port-channel-client';

describe('SerialPortChannelClient', () => {
  it('should create an instance', () => {
    expect(new SerialPortChannelClient()).toBeTruthy();
  });
});
