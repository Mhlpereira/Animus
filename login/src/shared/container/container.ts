import { Container } from 'inversify';
import { AuthMiddleware } from '../../middleware/auth-middleware';
import { IUserRepository, IUserService } from '../../user/user-interface';
import { UserService } from '../../user/user-service';
import { IDatabaseConnection } from '../interface/database-connection-interface';
import { IDatabase } from '../interface/database-interface';
import { PgDatabase } from '../db/Pgdatabase';
import { PgPoolClient } from '../db/PgPoolClient';
import { UserRepository } from '../../user/user-repository';
import { AuthRepository } from '../../auth/auth-repository';
import { AuthService } from '../../auth/auth-service';


const container = new Container();

//db
container.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPoolClient);
container.bind<IDatabase>('IDatabase').to(PgDatabase).inSingletonScope();

//user
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IUserService>('IUserService').to(UserService);

//auth
container.bind<IAuthRepository>('IAuthRepository').to(AuthRepository);
container.bind<IAuthService>('IAuthService').to(AuthService);

//middleware
container.bind(AuthMiddleware).toSelf();

export { container };