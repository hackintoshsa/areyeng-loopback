"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const user_schema_1 = require("../graphql/user.schema");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const services_1 = require("../services");
const security_1 = require("@loopback/security");
const crypto = tslib_1.__importStar(require("node:crypto"));
let AuthController = class AuthController {
    constructor(userRepository, userService, jwtService, user, mailService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtService = jwtService;
        this.user = user;
        this.mailService = mailService;
    }
    async register(userData) {
        const { firstname, lastname, email, password, gender } = userData;
        // Log request details
        helpers_1.log.info(`Register User Request: ${JSON.stringify(userData)}`);
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new rest_1.HttpErrors.Conflict('User Already Exists');
        }
        try {
            const newUser = new models_1.User(userData);
            await newUser.hashPassword();
            //const hashedPassword = await this.passwordHasher.hashPassword(password)
            // Save the new user to the database
            const savedUser = await this.userRepository.create(newUser);
            // Generate JWT token
            const userProfile = this.userService.convertToUserProfile(savedUser);
            const token = await this.jwtService.generateToken(userProfile);
            return {
                message: 'Successfully Registered',
                user: savedUser,
                token,
            };
        }
        catch (error) {
            throw new rest_1.HttpErrors.InternalServerError('Failed to create user');
        }
    }
    async login(credentials) {
        const { email, password } = credentials;
        // Log request details
        helpers_1.log.info(`Login User Request: ${JSON.stringify(credentials)}`);
        // Find the user by email
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new rest_1.HttpErrors.Unauthorized('Incorrect email or password');
        }
        // Check if the user is verified
        if (!user.verified) {
            throw new rest_1.HttpErrors.Forbidden('Not verified, please check your email');
        }
        // Compare the password
        const passwordMatch = await user.comparePassword(credentials.password);
        console.log(passwordMatch, credentials.password);
        if (!passwordMatch) {
            throw new rest_1.HttpErrors.Unauthorized('Incorrect password');
        }
        //Generate JWT token
        //const token = await this.tokenServiceImplementation.generateToken(user);
        //const user = await this.userService.verifyCredentials(credentials);
        // console.log(user);
        const userProfile = this.userService.convertToUserProfile(user);
        // Generate JWT token
        const token = await this.jwtService.generateToken(userProfile);
        return {
            userProfile,
            message: 'Successfully Logged In',
            token,
        };
    }
    async forgot(body) {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('No account with that email address exists');
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now().toString() + 3600000; // 1 hour
        await this.userRepository.updateById(user.id, user); // Make sure to handle potential errors
        await this.mailService.sendResetPasswordEmail(user.email, token, 'localhost:3000');
        return {
            message: `An e-mail has been sent to ${user.email} with further instructions.`,
            token,
        };
    }
    async resetPassword(credentials) {
        const { email, passwordToken, newPassword } = credentials;
        const currentTime = new Date().getTime(); // Get current time in milliseconds
        const user = await this.userRepository.findOne({
            where: {
                email: email,
                resetPasswordToken: passwordToken,
                resetPasswordExpires: { $gt: currentTime },
            },
        });
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('Invalid email or temporary password');
        }
        user.password = newPassword; // Assuming password hashing is handled in the model
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.updatedAt = new Date();
        const result = await this.userRepository.updateById(user.id, user);
        return {
            message: 'Password reset successful',
            result,
        };
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, rest_1.post)('/register', user_schema_1.RegisterUserSchema),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    'x-ts-type': models_1.User, // Use the RegisterUserRequest class as the schema
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, rest_1.post)('/login', user_schema_1.LoginUserSchema),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, rest_1.post)('/forgot'),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "forgot", null);
tslib_1.__decorate([
    (0, rest_1.post)('/reset-password'),
    tslib_1.__param(0, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(2, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(3, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__param(4, (0, core_1.inject)('service.mailService')),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        services_1.UsersService,
        services_1.JwtService, Object, services_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map