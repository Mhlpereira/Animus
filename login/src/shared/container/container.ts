import { Container } from 'inversify';
import { ICustomerModel, ICustomerService } from '../../customer/customer-interface';
import { CustomerModel } from '../../customer/customer-model';
import { CustomerService } from '../../customer/customer-service';
import { AuthMiddleware } from '../../middleware/auth-middleware';
import { IUserRepository, IUserService } from '../../user/user-interface';
import { UserService } from '../../user/user-service';
import { IDatabaseConnection } from '../interface/database-connection-interface';
import { IDatabase } from '../interface/database-interface';
import { PgDatabase } from '../db/Pgdatabase';
import { PgPoolClient } from '../db/PgPoolClient';
import { UserRepository } from '../../user/user-repository';


const container = new Container();

//db
container.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPoolClient);
container.bind<IDatabase>('IDatabase').to(PgDatabase).inSingletonScope();

//user
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IUserService>('IUserService').to(UserService);

//customer
container.bind<ICustomerModel>('ICustomerModel').to(CustomerModel);
container.bind<ICustomerService>('ICustomerService').to(CustomerService);

//middleware
container.bind(AuthMiddleware).toSelf();

export { container };