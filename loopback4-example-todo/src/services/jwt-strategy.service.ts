import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {inject} from '@loopback/core';
import {JwtService} from './jwt.service';
import {JWTAuthenticationStrategy, TokenServiceBindings} from '@loopback/authentication-jwt';

export class JwtStrategyService implements AuthenticationStrategy, JWTAuthenticationStrategy{
  name: string = 'jwt';
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: JwtService,
  ) {
  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const authHeader = request.headers['authorization'];

    // Ensure the token is in the 'Bearer <token>' format
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HttpErrors.Unauthorized('Authorization token must be in Bearer format');
    }

    const tokenValue = this.extractCredentials(request);
    if (!tokenValue) {
      throw new HttpErrors.Unauthorized('Token not found');
    }

    try {
      // Verify the token and get the payload
      const payload = await this.tokenService.verifyToken(tokenValue);
      console.log(payload)
      // Create a UserProfile based on the token payload
      const userProfile: UserProfile = {
        [securityId]: payload.sub, // The principal's unique ID (subject of the token)
        name: payload.sub,          // Placeholder for name, can be fetched from the database if needed
        email: payload.sub,
        payload// Placeholder for email, can be fetched from the database if needed
      };

      console.log(payload, userProfile)

      return userProfile;
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid or expired token');
    }
  }

  extractCredentials(request: Request): string {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return ''; // If no Authorization header is found, return an empty string
    }

    const parts = authHeader.split(' ');
    console.log(parts)
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1]; // Return the token part if it's in the "Bearer <token>" format
    }
    return ''; // Return empty string if the token format is incorrect
  }

}