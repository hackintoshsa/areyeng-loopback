import {BindingKey} from '@loopback/core';
import {TokenService, UserService} from '@loopback/authentication';
import {Credentials} from './repositories';
import {User} from './models';
import dotenv from 'dotenv';
dotenv.config();

export namespace ServiceConstants {
  export const TOKEN_SECRET_VALUE = process.env.TOKEN_SECRET ?? 'hackintoshsateam';
  export const TOKEN_EXPIRES_IN_VALUE = process.env.TOKEN_EXPIRES_IN ?? '1h';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, User>>(
    'services.user.service',
  );
}
