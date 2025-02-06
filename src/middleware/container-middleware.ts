import { Container } from "inversify";
import { IUserService } from "../user/user-interface";
import { UserService } from "../user/user-service";
import { AuthMiddleware } from "./auth-middleware";

const container = new Container();

container.bind<IUserService>("IUserService").to(UserService);
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();

export { container };