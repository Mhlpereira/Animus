import { Container } from 'inversify';
import { ICustomerModel, ICustomerService } from '../../customer/customer-interface';
import { CustomerModel } from '../../customer/customer-model';
import { CustomerService } from '../../customer/customer-service';
import { AuthMiddleware } from '../../middleware/auth-middleware';
import { IUserModel, IUserService } from '../../user/user-interface';
import { UserModel } from '../../user/user-model';
import { UserService } from '../../user/user-service';
import { PgPoolClient } from '../db/PgPoolClient.ts';
import { IDatabaseConnection } from '../interface/database-connection-interface';
import { IDatabase } from '../interface/database-interface';
import { Database } from '../db/databasePool';

const container = new Container();

//db
container.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPoolClient);
container.bind<IDatabase>('IDatabase').to(Database).inSingletonScope();

//user
container.bind<IUserModel>('IUserModel').to(UserModel);
container.bind<IUserService>('IUserService').to(UserService);

//customer
container.bind<ICustomerModel>('ICustomerModel').to(CustomerModel);
container.bind<ICustomerService>('ICustomerService').to(CustomerService);

//middleware
container.bind(AuthMiddleware).toSelf();

export { container };