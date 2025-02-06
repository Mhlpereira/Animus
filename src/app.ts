import express from 'express';
import { container } from './user-customer-register/user-customer-container';
import { UserController } from './user/user-controller';
import { authMiddleware } from './middleware/auth-middleware';


export const app = express();

app.use(express.json());

const userController = container.get(UserController);

const unprotectedRoutes = [
    { method: "POST", path: "/register" },
    { method: "GET", path: "/" },
    { method: "POST", path: "/login" },
];

app.use(authenticate(unprotectedRoutes));

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use('/register', registerUserWithCustomer);
app.use('/login')
app.listen(3000, () => console.log("Running on 3000"));

function authenticate(unprotectedRoutes: { method: string; path: string; }[]): any {
    throw new Error('Function not implemented.');
}
