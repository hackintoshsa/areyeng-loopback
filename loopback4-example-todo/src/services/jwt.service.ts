import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {HttpErrors} from '@loopback/rest';
import * as jwt from 'jsonwebtoken';
import {securityId, UserProfile} from '@loopback/security';
import {TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '../keys';


export class JwtService implements TokenService{
  name: string = 'jwt';
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,

    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    public  expireIn: string,

    @inject(TokenServiceBindings.TOKEN_SECRET)
    public readonly jwtSecret: string

) {}

  async generateToken(user: UserProfile): Promise<string> {
    if (!user.id) {
      throw new Error('User ID is required to generate a token.');
    }

    if (!user) {
      throw new HttpErrors.Unauthorized('Error while generating token :userProfile is null')
    }
    console.log(this.expireIn, this.jwtSecret)
    return jwt.sign(user, this.jwtSecret, {
      expiresIn: this.expireIn,
      algorithm: 'HS256'
    })
    // const payload = {
    //   iss: 'http://localhost:3000',
    //   sub: user.id.toString(), // Ensure user ID is a string
    //   iat: moment().unix(),
    //   exp: moment().add(1, 'day').unix(),
    // };
    // return jwt.sign(payload, this.jwtSecret, { algorithm: 'HS256' });
  }

  async verifyToken(tokenValue: string): Promise<UserProfile> {
    if (!tokenValue) {
      throw new HttpErrors.Unauthorized(`Error verifying token:'token' is null demo`);
    }
    try {
      const payload = jwt.verify(tokenValue, this.jwtSecret);
      // return Object.assign(
      //   {[securityId]: '', id: '', name: '', permissions: []},
      //   {
      //     [securityId]: payload.sub,
      //     id: payload.sub,
      //     name: payload.sub,
      //     permissions: payload.sub,
      //   },
      // );


      // Ensure `sub` is a string and not a function
      // Ensure `sub` is a string
      // const sub = typeof payload.sub === 'function' ? payload.sub() : payload.sub;

      // Construct the UserProfile object with the securityId and other properties
      const userProfile = {
        [securityId]: payload,
        id: payload.sub,
        name: payload.sub,
        permissions: payload.sub,
      } as UserProfile;
      return userProfile;

    } catch (error) {
      console.log(error);
      throw new Error('Invalid token: ' + (error as Error).message);
    }
  }


}