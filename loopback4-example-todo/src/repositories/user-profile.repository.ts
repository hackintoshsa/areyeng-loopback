import {DefaultCrudRepository} from '@loopback/repository';
import {UserProfile} from '../models';
import {inject} from '@loopback/core';
import {MongoDbDataSource} from '../datasources';

export class UserProfileRepository extends DefaultCrudRepository<
  UserProfile,
  typeof UserProfile.prototype.userId
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongoDbDataSource, // Inject the MongoDB data source
  ) {
    super(UserProfile, dataSource);
  }

  // Additional custom methods can go here if needed, e.g., for finding by userId
}