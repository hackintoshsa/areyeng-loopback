/// <reference types="express" />
import { Request } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { AuthenticationStrategy, TokenService } from '@loopback/authentication';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { JWTAuthenticationStrategy } from '@loopback/authentication-jwt';
export declare class TokenServiceImplementation implements AuthenticationStrategy, JWTAuthenticationStrategy {
    private jwtSecret;
    private userRepository;
    name: string;
    constructor(jwtSecret: string, // Inject the JWT secret from the context
    userRepository: UserRepository);
    generateToken(userProfile: UserProfile): Promise<string>;
    verifyToken(tokenValue: string): Promise<UserProfile>;
    authenticate(request: Request): Promise<UserProfile | undefined>;
    extractCredentials(request: Request): string;
    convertToUserProfile(user: User): Promise<UserProfile>;
    verifyCredentials(credentials: User): Promise<User>;
    tokenService: TokenService;
}
