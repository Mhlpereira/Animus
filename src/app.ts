import { Router } from 'express';
import express from 'express';
import { AuthMiddleware } from './middleware/auth-middleware';
import { container } from './container';
import { UserModel } from './user/user-model';
import { CustomerModel } from './customer/customer-model';
import { UserCustomerController } from './user-customer-register/user-customer-controller';

export const app = express();
const router = Router();
app.use(express.json());

const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware);
const userWithCustomer = container.get<UserCustomerController<UserModel, CustomerModel>>(UserCustomerController);


app.use(authMiddleware.authenticate());
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use('/', router);
router.use('/register', userWithCustomer.registerUserCustomerRoutes);

app.listen(3000, () => console.log("Running on 3000"));
