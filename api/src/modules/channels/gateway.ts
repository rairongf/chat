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

/**
 * `namespace` defaults to `'/'`
 *
 * `path` defaults to `'/socket.io'`
 */
@WebSocketGateway(80, {
  cors: { origin: '*' },
  //namespace: '/^\/channels\/[a-zA-Z0-9]+$/',
  //path: '/socket.io',
})
export class ChannelsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('New user connected...', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected...', client.id);
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() payload: {
      channelId: string;
      content: string;
      senderId: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`[events] ${client.id}: ${payload}`);

    this.server.emit(payload.channelId, `${payload.senderId}: ${payload.content}`);
  }

  @SubscribeMessage('join_channel')
  async handleJoinChannel(
    @MessageBody()
    payload: {
      channelId: string;
      senderId: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`[join_channel] ${client.id}:`, payload);
    if (!payload.channelId) return;

    client.emit(payload.channelId, 'You joined the channel');
    client.broadcast.emit(payload.channelId, `New User joined the channel: ${client.id}`);
  }
}
