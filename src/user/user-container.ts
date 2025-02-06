import { Container } from 'inversify';
import { IUserModel } from './user-interface';
import { UserModel } from './user-model';
import { UserService } from './user-service';
import { UserController } from './user-controller';

const userContainer = new Container();

userContainer.bind<IUserModel>('IUserModel').to(UserModel);
userContainer.bind<UserService>(UserService).toSelf();
userContainer.bind<UserController>(UserController).toSelf();

export { userContainer };