import { Container } from 'inversify';
import { IUserModel , IUserService } from './user/user-interface';
import { UserModel } from './user/user-model';
import { UserService } from './user/user-service';
import { CustomerModel } from './customer/customer-model';
import { AuthMiddleware } from './middleware/auth-middleware';
import { ICustomerModel, ICustomerService } from './customer/customer-interface';
import { CustomerService } from './customer/customer-service';

const container = new Container();

container.bind<IUserModel>('IUserModel').to(UserModel);
container.bind<IUserService>('IUserService').to(UserService);
container.bind<ICustomerModel>('ICustomerModel').to(CustomerModel);
container.bind<ICustomerService>('ICustomerService').to(CustomerService);
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();

export { container };