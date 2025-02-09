import express from 'express';
import { AuthMiddleware } from './middleware/auth-middleware';
import { container } from './container';
import { InversifyExpressServer } from 'inversify-express-utils';


const app = new InversifyExpressServer(container);

app.setConfig((server) => server.use(express.json()));

const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware);



app.use(authMiddleware.authenticate());
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use('/', router);

app.listen(3000, () => console.log("Running on 3000"));
