import { BindingKey } from '@loopback/core';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from './repositories';
import { User } from './models';
export declare namespace ServiceConstants {
    const TOKEN_SECRET_VALUE: string;
    const TOKEN_EXPIRES_IN_VALUE: string;
}
export declare namespace TokenServiceBindings {
    const TOKEN_SECRET: BindingKey<string>;
    const TOKEN_EXPIRES_IN: BindingKey<string>;
    const TOKEN_SERVICE: BindingKey<TokenService>;
}
export declare namespace UserServiceBindings {
    const USER_SERVICE: BindingKey<UserService<Credentials, User>>;
}
