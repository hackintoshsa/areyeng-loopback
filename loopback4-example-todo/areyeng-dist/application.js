"use strict";
// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const utils_1 = require("./utils");
const services_1 = require("./services");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const datasources_1 = require("./datasources");
const authentication_1 = require("@loopback/authentication");
const keys_1 = require("./keys");
dotenv_1.default.config();
class TodoListApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        this.addSecuritySpec();
        const tokenSecret = process.env.TOKEN_SECRET;
        const expiresIn = process.env.TOKEN_EXPIRES_IN;
        if (!tokenSecret) {
            throw new Error('Missing token in value.');
        }
        if (!expiresIn) {
            throw new Error('Missing secret in value.');
        }
        // }else if (!expiresIn){
        //   throw new Error('Missing secret in value.');
        // }
        //Binding the Custom MongoDB Datasource To Application
        this.bind('datasources.mongodb').to(new datasources_1.MongoDbDataSource());
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        this.component(authentication_1.AuthenticationComponent);
        // registerAuthenticationStrategy(this, TokenServiceImplementation)
        // this.bind('jwt.secret').to(process.env.TOKEN_SECRET ?? 'hackintoshsateam');
        //Binding Custom JWTService to TokenService
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE).toClass(services_1.JwtService);
        //Binding Custom JWTService to TokenService
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.ServiceConstants.TOKEN_SECRET_VALUE);
        this.bind(authentication_jwt_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.ServiceConstants.TOKEN_EXPIRES_IN_VALUE);
        // this.bind('services.authentication.basic.user.service.binding').toClass(
        //   JwtStrategyService,
        // );
        //Binding UsersService to UserService
        //this.bind(UserServiceBindings.USER_SERVICE).toClass(UsersService);
        //Registering JWTStrategy to AuthenticationStrategy
        (0, authentication_1.registerAuthenticationStrategy)(this, authentication_jwt_1.JWTAuthenticationStrategy);
        // Binding the TokenService to the DI container
        // Binding a UserService
        //this.bind(UserServiceBindings.USER_SERVICE).toClass(TokenServiceImplementation);
        this.bind('services.PasswordHasher').toClass(utils_1.PasswordHasher).inScope(core_1.BindingScope.SINGLETON);
        const mailConfig = (0, services_1.getMailConfig)();
        this.bind('service.mailService').to(mailConfig);
        //this.bind(MongoDataSource,UserServiceBindings.DATASOURCE_NAME)
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
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
    setupLogging() {
        // Register `morgan` express middleware
        // Create a middleware factory wrapper for `morgan(format, options)`
        const morganFactory = (config) => {
            this.debug('Morgan configuration', config);
            return (0, morgan_1.default)('combined', config);
        };
        // Print out logs using `debug`
        const defaultConfig = {
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
    addSecuritySpec() {
        this.api({
            openapi: '3.0.0',
            info: {
                title: 'test application',
                version: '1.0.0',
            },
            paths: {},
            components: { securitySchemes: authentication_jwt_1.SECURITY_SCHEME_SPEC },
            security: [
                {
                    // secure all endpoints with 'jwt'
                    jwt: [],
                },
            ],
            servers: [{ url: '/' }],
        });
    }
}
exports.TodoListApplication = TodoListApplication;
//# sourceMappingURL=application.js.map