import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { MessagePayload } from '../common';
import { CreateMessageService } from '../messages/services';
import { EventMessageBodyDTO } from './dtos';

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
  constructor(private readonly createMessageService: CreateMessageService) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('New user connected...', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected...', client.id);
  }

  @SubscribeMessage('events')
  async handleEvent(
    @MessageBody()
    payload: EventMessageBodyDTO,
    //@ConnectedSocket() client: Socket,
  ) {
    console.log(`[events] ${payload.senderId}:`, payload);
    if (!payload.channelId) return;
    if (!payload.senderId) return;

    const message = await this.createMessageService.handle(
      {
        senderId: new Types.ObjectId(payload.senderId),
        channelId: new Types.ObjectId(payload.channelId),
        content: payload.content,
      },
    );

    this.serverEmitTo<MessagePayload>(payload.channelId, message);
  }

  /* @SubscribeMessage('join_guild')
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

    const message = await this.createMessageService.handle(new Types.ObjectId(payload.senderId), {
      channelId: new Types.ObjectId(payload.channelId),
      content: `${payload.senderId} joined the server`,
    }); 
    
    this.serverEmitTo<MessagePayload>(payload.channelId, message);
  }*/

  private serverEmitTo<T extends object>(event: string, data: T) {
    this.server.emit(event, data);
  }

  private emitWithClientTo<T extends object>(
    event: string,
    client: Socket,
    data: T,
    broadcast: boolean = false,
  ) {
    if (broadcast) {
      client.broadcast.emit(event, data);
      return;
    }

    client.emit(event, data);
  }
}
