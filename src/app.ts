import express from 'express';
import { registerUserCustomerRoutes } from './user-customer-register/user-customer-controller';
import jwt from 'jsonwebtoken';
import { UserService } from './user/user-service';

export const app = express();

app.use(express.json());

const unprotectedRoutes = [
    { method: "POST", path: "/register" },
    { method: "GET", path: "/" },
    { method: "POST", path: "/login" },
];

app.use(async (req, res, next) => {
    const isUnprotectedRoute = unprotectedRoutes.some(
        (route) => route.method === req.method && req.path.startsWith(route.path)
    );
    
    if (isUnprotectedRoute) {
        return next();
    }

    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Token not provided" });
        return;
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET) as { 
            id: string;
            email: string;
        };
        const userService = new UserService();
        const user = await userService.getUserById(payload.id);
        if (!user) {
            res.status(401).json({ message: "Failed to authenticate user token" });
            return;
        }
        req.user = user as { id: string; email: string };
        next();
    }catch(e){
        res.status(401).json({ message: "Failed to authenticate token" });
    }
});

app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use('/register', registerUserCustomerRoutes);

app.listen(3000, () => console.log("Running on 3000"));