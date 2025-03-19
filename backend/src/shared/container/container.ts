import { EventSocket } from '../../../sockets/event-socket';
import { Container } from 'inversify';
import { AuthMiddleware } from '../../middleware/auth-middleware';
import { IUserRepository, IUserService } from '../../user/user-interface';
import { UserService } from '../../user/user-service';
import { IDatabaseConnection } from '../interface/database-connection-interface';
import { IDatabase } from '../interface/database-interface';
import { PgDatabase } from '../db/postgres/Pgdatabase';
import { PgPoolClient } from '../db/postgres/PgPoolClient';
import { UserRepository } from '../../user/user-repository';
import { AuthRepository } from '../../auth/auth-repository';
import { AuthService } from '../../auth/auth-service';
import { IAuthRepository, IAuthService } from '../../auth/auth-interface';
import { IGroupRepository, IGroupService } from '../../group/group-interface';
import { GroupRepository } from '../../group/grupo-repository';
import { GroupService } from '../../group/group-service';
import { IUserGroupRepository, IUserGroupService } from '../../group/user-group/user-group-interface';
import { UserGroupRepository } from '../../group/user-group/user-group-repository';
import { UserGroupService } from '../../group/user-group/user-group-service';
import { IMongoDB } from '../interface/mongo-database-interface';
import { MongoDB } from '../db/mongodb/mongo-singleton';
import { IEventRepository, IEventService } from '../../events/event-interfaces';
import { EventService } from '../../events/event-service';
import { EventRepository } from '../../events/event-repository';
import { SocketManager } from '../../sockets/socket-manager';


const container = new Container();

//db-postgres
container.bind<IDatabaseConnection>('IDatabaseConnection').to(PgPoolClient);
container.bind<IDatabase>('IDatabase').to(PgDatabase).inSingletonScope();

//db-mongo
container.bind<IMongoDB>('IMongoDB').to(MongoDB)

//user
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IUserService>('IUserService').to(UserService);

//group
container.bind<IGroupRepository>('IGroupRepository').to(GroupRepository);
container.bind<IGroupService>('IGroupService').to(GroupService);

//userGroup
container.bind<IUserGroupRepository>('IUserGroupRepository').to(UserGroupRepository);
container.bind<IUserGroupService>('IUserGroupService').to(UserGroupService);    

//event
container.bind<IEventRepository>('IEventRepository').to(EventRepository);
container.bind<IEventService>('IEventService').to(EventService);
container.bind<EventSocket>('EventSocket').to(EventSocket);

//auth
container.bind<IAuthRepository>('IAuthRepository').to(AuthRepository);
container.bind<IAuthService>('IAuthService').to(AuthService);

//socket
container.bind<SocketManager>('SocketManager').to(SocketManager);

//middleware
container.bind(AuthMiddleware).toSelf();

export { container };