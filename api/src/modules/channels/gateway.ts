import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { Message } from '../data';
import { CreateMessageService } from '../messages/services';

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
  constructor(
    private readonly createMessageService: CreateMessageService,
  ) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('New user connected...', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected...', client.id);
  }

  @SubscribeMessage('events')
  async handleEvent(
    @MessageBody() payload: {
      channelId: string;
      content: string;
      senderId: string;
    },
    //@ConnectedSocket() client: Socket,
  ) {
    console.log(`[events] ${payload.senderId}:`, payload);
    if (!payload.channelId) return;

    const message = await this.createMessageService.handle(new Types.ObjectId(payload.senderId), {
      channelId: new Types.ObjectId(payload.channelId),
      content: payload.content,
    });

    this.serverEmitTo<Message>(payload.channelId, message);
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
    console.log(`[join_channel] ${payload.senderId}:`, payload);
    if (!payload.channelId) return;

    client.emit(payload.channelId, 'You joined the channel');
    client.broadcast.emit(payload.channelId, `User joined the channel: ${payload.senderId}`);
  }

  @SubscribeMessage('leave_channel')
  async handleLeaveChannel(
    @MessageBody()
    payload: {
      channelId: string;
      senderId: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`[leave_channel] ${payload.senderId}:`, payload);
    if (!payload.channelId) return;

    client.emit(payload.channelId, 'You left the channel');
    client.broadcast.emit(payload.channelId, `User left the channel: ${payload.senderId}`);
  }

  private serverEmitTo<T extends object>(event: string, data: T) {
    this.server.emit(event, data);
  }
}
