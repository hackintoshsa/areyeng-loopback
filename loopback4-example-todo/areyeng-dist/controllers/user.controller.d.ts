import { UserRepository } from '../repositories';
import { JwtService, UsersService } from '../services';
import { UserProfile } from '@loopback/security';
import { UserProfileRepository } from '../repositories';
import { UserProfile as UserProfModel } from '../models/user-profile.model';
export declare class UserController {
    private userRepository;
    private userProfileRepo;
    protected userService: UsersService;
    jwtService: JwtService;
    user: UserProfile;
    constructor(userRepository: UserRepository, userProfileRepo: UserProfileRepository, userService: UsersService, jwtService: JwtService, user: UserProfile);
    loadUser(id: string): Promise<{
        user: object;
    }>;
    getUser(userId: UserProfile): Promise<{
        msg: string;
        user: object;
    }>;
    getUserProfile(currentUserProfile: UserProfile): Promise<string | undefined>;
    getUserProfile2(token: UserProfile): Promise<UserProfile>;
    whoAmI(): string;
    updateUser(currentUser: UserProfile, // Inject the authenticated user's profile
    userProfileData: UserProfModel): Promise<{
        msg: string;
        user: object;
    }>;
}
