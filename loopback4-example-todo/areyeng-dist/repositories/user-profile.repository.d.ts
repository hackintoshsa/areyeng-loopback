import { DefaultCrudRepository } from '@loopback/repository';
import { UserProfile } from '../models';
import { MongoDbDataSource } from '../datasources';
export declare class UserProfileRepository extends DefaultCrudRepository<UserProfile, typeof UserProfile.prototype.userId> {
    constructor(dataSource: MongoDbDataSource);
}
