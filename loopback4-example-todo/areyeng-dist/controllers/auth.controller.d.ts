import { User } from '../models';
import { UserRepository } from '../repositories';
import { EmailService, JwtService, UsersService } from '../services';
import { UserProfile } from '@loopback/security';
export declare class AuthController {
    private userRepository;
    protected userService: UsersService;
    jwtService: JwtService;
    user: UserProfile;
    protected mailService: EmailService;
    constructor(userRepository: UserRepository, userService: UsersService, jwtService: JwtService, user: UserProfile, mailService: EmailService);
    register(userData: Omit<User, 'id'>): Promise<{
        message: string;
        user: User;
        token: string;
    }>;
    login(credentials: {
        email: string;
        password: string;
    }): Promise<object>;
    forgot(body: {
        email: string;
    }): Promise<{
        message: string;
        token: string;
    }>;
    resetPassword(credentials: {
        email: string;
        passwordToken: string;
        newPassword: string;
    }): Promise<{
        result: void;
        message: string;
    }>;
}
