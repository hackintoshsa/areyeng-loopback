import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {inject} from '@loopback/core';
import {MongoDbDataSource} from '../datasources';

export type Credentials = {
  email: string;
  password: string;
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongoDbDataSource) {
    super(User, dataSource);
  }

  // async create(entity: User): Promise<User> {
  //   await entity.hashPassword(); // Hash the password before saving
  //   return super.create(entity);
  // }
}
