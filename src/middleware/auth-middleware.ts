import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IUserService } from "../user/user-interface";

interface AuthenticatedRequest extends Request {
    user?: { id: string; email: string };
}

@injectable()
export class AuthMiddleware {

    constructor(@inject('IUserService') private userService: IUserService) { }



    authenticate() {
        return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            console.log("Entrou no middleware");
            const unprotectedRoutes = [
                { method: "GET", path: "/" },
                { method: "POST", path: "/register" },
                { method: "POST", path: "/login" },
            ];

            const isUnprotectedRoute = unprotectedRoutes.some(
                (route) => route.method === req.method && req.path.startsWith(route.path)
            );
            console.log("isUnprotectedRoute", isUnprotectedRoute);
            if (isUnprotectedRoute) {
                console.log("Dentro do if unprotected route")
                return next();
            }

            const token = req.headers["authorization"]?.split(" ")[1];

            if (!token) {
                res.status(401).json({ message: "Token not provided" });
                return;
            }
            console.log("entrando no try");
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET) as {
                    id: string;
                    email: string;
                };
                const user = await this.userService.getUserById(payload.id);
                if (!user) {
                    res.status(401).json({ message: "Failed to authenticate user token" });
                    return;
                }
                req.user = user as { id: string; email: string };
                console.log("Passou pelo middleware");
                next();
            } catch (e) {
                res.status(401).json({ message: "Failed to authenticate token" });
            }
        }
    }
}