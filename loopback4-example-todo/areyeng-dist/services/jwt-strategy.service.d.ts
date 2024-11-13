/// <reference types="express" />
import { AuthenticationStrategy } from '@loopback/authentication';
import { Request } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { JwtService } from './jwt.service';
import { JWTAuthenticationStrategy } from '@loopback/authentication-jwt';
export declare class JwtStrategyService implements AuthenticationStrategy, JWTAuthenticationStrategy {
    tokenService: JwtService;
    name: string;
    constructor(tokenService: JwtService);
    authenticate(request: Request): Promise<UserProfile | undefined>;
    extractCredentials(request: Request): string;
}
