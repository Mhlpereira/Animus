import { Container } from 'inversify';
import { IUserModel } from '../user/user-interface';
import { UserModel } from '../user/user-model';
import { UserCustomerService } from './user-customer-service';
import { UserCustomerController } from './user-customer-controller';
import { IUserCustomerService } from './user-customer-interface';
import { CustomerModel } from '../customer/customer-model';

const userCustomerContainer = new Container();

userCustomerContainer.bind<IUserModel>('IUserModel').to(UserModel);
userCustomerContainer.bind<IUserCustomerService<UserModel, CustomerModel>>('IUserCustomerService').to(UserCustomerService);
userCustomerContainer.bind<UserCustomerController<UserModel, CustomerModel>>(UserCustomerController).toSelf();

export { userCustomerContainer };