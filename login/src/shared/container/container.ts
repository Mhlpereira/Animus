import { Container } from 'inversify';
import { ICustomerModel, ICustomerService } from '../../customer/customer-interface';
import { CustomerModel } from '../../customer/customer-model';
import { CustomerService } from '../../customer/customer-service';
import { IGroupModel, IGroupService } from '../../group/group-interface';
import { GroupModel } from '../../group/group-model';
import { GroupService } from '../../group/group-service';
import { AuthMiddleware } from '../../middleware/auth-middleware';
import { IUserModel, IUserService } from '../../user/user-interface';
import { UserModel } from '../../user/user-model';
import { UserService } from '../../user/user-service';
import { PgPoolClient } from '../db/PgPoolClientAdapter';
import { IDatabaseConnection } from '../interface/database-interface';

const container = new Container();

//db
container.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPoolClient);

//user
container.bind<IUserModel>('IUserModel').to(UserModel);
container.bind<IUserService>('IUserService').to(UserService);

//customer
container.bind<ICustomerModel>('ICustomerModel').to(CustomerModel);
container.bind<ICustomerService>('ICustomerService').to(CustomerService);

//group
container.bind<IGroupModel>('IGroupModel').to(GroupModel);
container.bind<IGroupService>('IGroupService').to(GroupService);

//middleware
container.bind(AuthMiddleware).toSelf();

export { container };