import { Container } from 'inversify';
import { IUserModel , IUserService } from './user/user-interface';
import { UserModel } from './user/user-model';
import { UserService } from './user/user-service';
import { UserController } from './user/user-controller';
import { CustomerModel } from './customer/customer-model';
import { UserCustomerController } from './user-customer-register/user-customer-controller';
import { IUserCustomerService } from './user-customer-register/user-customer-interface';
import { UserCustomerService } from './user-customer-register/user-customer-service';
import { AuthMiddleware } from './middleware/auth-middleware';

const container = new Container();

container.bind<IUserModel>('IUserModel').to(UserModel);
container.bind<IUserService>('IUserService').to(UserService);
container.bind<IUserCustomerService<UserModel, CustomerModel>>('IUserCustomerService').to(UserCustomerService);
container.bind<UserController>(UserController).toSelf();
container.bind<UserCustomerController<UserModel, CustomerModel>>(UserCustomerController).toSelf();
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();

export { container };