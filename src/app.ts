import express from 'express';
import { registerUserCustomerRoutes } from './user-customer-register/user-customer-controller';


export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
  });

app.use('/register', registerUserCustomerRoutes);

app.listen(3000, () => console.log("Running on 3000"));