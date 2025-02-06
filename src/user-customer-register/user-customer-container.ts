import { Container } from 'inversify';
import { IUserModel } from '../user/user-interface';
import { UserModel } from '../user/user-model';
import { UserCustomerService } from './user-customer-service';
import { UserCustomerController } from './user-customer-controller';

const userCustomerContainer = new Container();

userCustomerContainer.bind<IUserModel>('IUserModel').to(UserModel);
userCustomerContainer.bind<UserCustomerService>(UserCustomerService).toSelf();
userCustomerContainer.bind<UserCustomerController>(UserCustomerController).toSelf();

export { userCustomerContainer };