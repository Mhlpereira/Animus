import { setupSwagger } from './../swagger';
import 'reflect-metadata';
import express from 'express';
import { AuthMiddleware } from './middleware/auth-middleware';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './shared/container/container';
import './shared/routes/routes';
import http from 'http';

const inversifyServer = new InversifyExpressServer(container);
inversifyServer.setConfig((server) => {
    server.use(express.json());
    server.use(authMiddleware.handler());
});
const app = inversifyServer.build();
setupSwagger(app)
const server = http.createServer(app);
const authMiddleware = container.get(AuthMiddleware);




server.listen(3000, () => console.log("Running on 3000"));
