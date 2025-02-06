import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IUserService } from "../user/user-interface";

interface AuthenticatedRequest extends Request {
    user?: { id: string; email: string };
}

@injectable()
export class AuthMiddleware{
    
    constructor(@inject('IUserService') private userService: IUserService){}

    async authenticate (req: AuthenticatedRequest, res: Response, 
        next: NextFunction, unprotectedRoutes: { method: string; path: string; }[]) {
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
        next();
    } catch (e) {
        res.status(401).json({ message: "Failed to authenticate token" });
    }
};
}