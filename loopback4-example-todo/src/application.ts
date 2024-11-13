// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {Request, Response, RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import morgan from 'morgan';
import path from 'path';
import {MySequence} from './sequence';
import {PasswordHasher} from './utils';
import {getMailConfig, JwtService} from './services';
import {
  JWTAuthenticationComponent, JWTAuthenticationStrategy, SECURITY_SCHEME_SPEC,
  TokenServiceBindings,
} from '@loopback/authentication-jwt';

import dotenv from 'dotenv';
import {MongoDbDataSource} from './datasources';
import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {ServiceConstants} from './keys';


export {ApplicationConfig};

dotenv.config();
export class TodoListApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);


    // Set up the custom sequence
    this.sequence(MySequence);
    this.addSecuritySpec();

    const tokenSecret = process.env.TOKEN_SECRET;
    const expiresIn = process.env.TOKEN_EXPIRES_IN;

    if (!tokenSecret ) {
      throw new Error('Missing token in value.');
    }
    if (!expiresIn){
      throw new Error('Missing secret in value.');
    }
    // }else if (!expiresIn){
    //   throw new Error('Missing secret in value.');
    // }


    //Binding the Custom MongoDB Datasource To Application
    this.bind('datasources.mongodb').to(new MongoDbDataSource());
    this.component(JWTAuthenticationComponent)
    this.component(AuthenticationComponent)
    // registerAuthenticationStrategy(this, TokenServiceImplementation)
    // this.bind('jwt.secret').to(process.env.TOKEN_SECRET ?? 'hackintoshsateam');



    //Binding Custom JWTService to TokenService
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JwtService);

    //Binding Custom JWTService to TokenService
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(ServiceConstants.TOKEN_SECRET_VALUE)
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(ServiceConstants.TOKEN_EXPIRES_IN_VALUE)
    // this.bind('services.authentication.basic.user.service.binding').toClass(
    //   JwtStrategyService,
    // );

    //Binding UsersService to UserService
    //this.bind(UserServiceBindings.USER_SERVICE).toClass(UsersService);

    //Registering JWTStrategy to AuthenticationStrategy
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy)




    // Binding the TokenService to the DI container


// Binding a UserService
    //this.bind(UserServiceBindings.USER_SERVICE).toClass(TokenServiceImplementation);


    this.bind('services.PasswordHasher').toClass(PasswordHasher).inScope(BindingScope.SINGLETON)

    const mailConfig = getMailConfig();
    this.bind('service.mailService').to(mailConfig);
    //this.bind(MongoDataSource,UserServiceBindings.DATASOURCE_NAME)


    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.setupLogging();
  }

  private setupLogging() {
    // Register `morgan` express middleware
    // Create a middleware factory wrapper for `morgan(format, options)`
    const morganFactory = (config?: morgan.Options<Request, Response>) => {
      this.debug('Morgan configuration', config);
      return morgan('combined', config);
    };

    // Print out logs using `debug`
    const defaultConfig: morgan.Options<Request, Response> = {
      stream: {
        write: str => {
          this._debug(str);
        },
      },
    };
    this.expressMiddleware(morganFactory, defaultConfig, {
      injectConfiguration: 'watch',
      key: 'middleware.morgan',
    });
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'test application',
        version: '1.0.0',
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          // secure all endpoints with 'jwt'
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }
}
