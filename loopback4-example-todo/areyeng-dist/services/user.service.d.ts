import { UserProfile } from '@loopback/security';
import { User } from '../models';
import { Credentials, UserRepository } from '../repositories';
import { UserService } from '@loopback/authentication';
export declare class UsersService implements UserService<User, Credentials> {
    private userRepository;
    constructor(userRepository: UserRepository);
    convertToUserProfile(user: User): UserProfile;
    verifyCredentials(credentials: Credentials): Promise<User>;
}
