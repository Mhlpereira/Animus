import { Router } from 'express';
import express from 'express';
import { AuthMiddleware } from './middleware/auth-middleware';
import { container as middlewareContainer} from './middleware/container-middleware';
import { userCustomerContainer } from './user-customer-register/user-customer-container';
import { UserCustomerController } from './user-customer-register/user-customer-controller';
import { UserModel } from './user/user-model';
import { CustomerModel } from './customer/customer-model';

export const app = express();
const router = Router();
app.use(express.json());

const authMiddleware = middlewareContainer.get<AuthMiddleware>(AuthMiddleware);
const userWithCustomer = userCustomerContainer.get<UserCustomerController<UserModel, CustomerModel>>(UserCustomerController);

const unprotectedRoutes = [
    { method: "POST", path: "/register" },
    { method: "GET", path: "/" },
    { method: "POST", path: "/login" },
];

const authMiddlewareWrapper = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    authMiddleware.authenticate(req, res, next, unprotectedRoutes);
};

app.use(authMiddlewareWrapper);

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

router.use('/register', userWithCustomer.registerUserCustomerRoutes);
app.use('/login')
app.listen(3000, () => console.log("Running on 3000"));
