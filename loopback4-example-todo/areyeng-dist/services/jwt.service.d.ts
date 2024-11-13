import { UserRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
import { TokenService } from '@loopback/authentication';
export declare class JwtService implements TokenService {
    private userRepository;
    expireIn: string;
    readonly jwtSecret: string;
    name: string;
    constructor(userRepository: UserRepository, expireIn: string, jwtSecret: string);
    generateToken(user: UserProfile): Promise<string>;
    verifyToken(tokenValue: string): Promise<UserProfile>;
}
