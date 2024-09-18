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

    /* const message = await this.createMessageService.handle(new Types.ObjectId(payload.senderId), {
      channelId: new Types.ObjectId(payload.channelId),
      content: `${payload.senderId} joined the channel`,
    }); */
    const message = {
      _id: new Types.ObjectId(),
      channelId: payload.channelId,
      content: `${payload.senderId} joined the channel`,
      senderId: payload.senderId,
      createdAt: new Date(),
    };

    this.emitWithClientTo(payload.channelId, client, { ...message, content: 'You joined the channel' });
    this.emitWithClientTo(payload.channelId, client, message, true);
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

    /* const message = await this.createMessageService.handle(new Types.ObjectId(payload.senderId), {
      channelId: new Types.ObjectId(payload.channelId),
      content: `${payload.senderId} left the channel`,
    }); */
    const message = {
      _id: new Types.ObjectId(),
      channelId: payload.channelId,
      content: `${payload.senderId} left the channel`,
      senderId: payload.senderId,
      createdAt: new Date(),
    };

    this.emitWithClientTo(payload.channelId, client, { ...message, content: 'You left the channel' });
    this.emitWithClientTo(payload.channelId, client, message, true);
  }

  private serverEmitTo<T extends object>(event: string, data: T) {
    this.server.emit(event, data);
  }

  private emitWithClientTo<T extends object>(event: string, client: Socket, data: T, broadcast: boolean = false) {
    if (broadcast) {
      client.broadcast.emit(event, data);
      return;
    }

    client.emit(event, data);
  }
}
