import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Events } from 'src/constants';

/**
 * `namespace` defaults to `'/'`
 *
 * `path` defaults to `'/socket.io'`
 */
@WebSocketGateway(80, {
  cors: { origin: '*' },
  namespace: 'channel',
  path: '/socket.io',
})
export class ChannelsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('New user connected...', client.id);

    client.emit(Events.userJoined, {
      message: 'You joined the channel',
    });

    client.broadcast.emit(Events.userJoined, {
      message: `New User joined the channel: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected...', client.id);

    //TODO: this wont work
    client.emit(Events.userLeft, {
      message: 'You left the channel',
    });

    client.broadcast.emit(Events.userLeft, {
      message: `User left the channel: ${client.id}`,
    });
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${client.id}: ${message}`);

    this.server.emit(Events.messages, message);
  }
}
