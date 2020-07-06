import ChannelClient = fin.ChannelClient;

export class SerialPortChannelClient {

  constructor(private client: ChannelClient) {
    this.client.register('events', (payload, identity) => {
      console.log('Action dispatched by provider: ', JSON.stringify(identity));
      console.log('Payload sent in dispatch: ', JSON.stringify(payload));
    });
  }

  static async makeClient(): Promise<SerialPortChannelClient> {
    const client = await fin.InterApplicationBus.Channel.connect('SerialPort');
    return new SerialPortChannelClient(client);
  }

  getPorts(): Promise<string[]> {
    return this.client.dispatch('getPorts');
  }
}
