import { setupSwagger } from '../swagger';
import 'reflect-metadata';
import express from 'express';
import { AuthMiddleware } from './middleware/auth-middleware';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './shared/container/container';
import './shared/routes/routes';
import { Server } from 'socket.io';
import http from 'http';
import { SocketManager } from './sockets/socket-manager';


const inversifyServer = new InversifyExpressServer(container);
inversifyServer.setConfig((server) => {
    server.use(express.json());
    server.use(authMiddleware.handler());
});
const app = inversifyServer.build();
setupSwagger(app)
const server = http.createServer(app);
const io = new Server(server);
const authMiddleware = container.get(AuthMiddleware);


const socketManager =  container.get<SocketManager>('SocketManager');
socketManager.init(io);




server.listen(3000, () => console.log("Running on 3000"));
