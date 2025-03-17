import { Server } from 'socket.io';
import { EventSocket } from './event-socket';
import { inject, injectable } from 'inversify';

@injectable()
export class SocketManager{

    constructor(
        @inject('EventSocket') private eventSocket: EventSocket
    ){}

    public init(io: Server){
        io.on('connection', (socket) => {

            this.eventSocket.initialize(socket);

            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id);
            })
        }
    }
}