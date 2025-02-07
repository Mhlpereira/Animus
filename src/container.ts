import { Container } from 'inversify';
import { IUserModel , IUserService } from './user/user-interface';
import { UserModel } from './user/user-model';
import { UserService } from './user/user-service';
import { UserController } from './user/user-controller';
import { CustomerModel } from './customer/customer-model';
import { AuthMiddleware } from './middleware/auth-middleware';

const container = new Container();

container.bind<IUserModel>('IUserModel').to(UserModel);
container.bind<IUserService>('IUserService').to(UserService);
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();

export { container };