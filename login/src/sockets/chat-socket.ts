import { Server, Socket } from 'socket.io';
import { inject, injectable } from 'inversify';
import { MessageService } from '../services/MessageService';
import { TYPES } from '../constants/types';

@injectable()
export class ChatSocket {
  constructor(
    @inject(TYPES.MessageService) private messageService: MessageService,
  ) {}

  public initialize(io: Server): void {
    io.on('connection', (socket: Socket) => {
      console.log('Um usuário conectou:', socket.id);

      socket.on('joinGroup', async (groupId: string) => {
        socket.join(groupId);
        const messages = await this.messageService.getMessagesByGroup(groupId);
        socket.emit('loadMessages', messages);
      });

      socket.on('disconnect', () => {
        console.log('Um usuário desconectou:', socket.id);
      });
    });
  }
}