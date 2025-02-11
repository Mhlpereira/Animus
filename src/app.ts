import 'reflect-metadata';
import express from 'express';
import { AuthMiddleware } from './middleware/auth-middleware';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './container';
import './auth/auth-controller';


const app = new InversifyExpressServer(container);
const authMiddleware = container.get(AuthMiddleware);

app.setConfig((server) => {
    server.use(express.json());
    server.use(authMiddleware.authenticate());
});



const server = app.build();


server.listen(3000, () => console.log("Running on 3000"));
