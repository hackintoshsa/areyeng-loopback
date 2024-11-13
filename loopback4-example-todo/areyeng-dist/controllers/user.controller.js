"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
// src/controllers/user.controller.ts
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const authentication_1 = require("@loopback/authentication");
const services_1 = require("../services");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const security_1 = require("@loopback/security");
const repositories_2 = require("../repositories");
const user_profile_model_1 = require("../models/user-profile.model");
let UserController = class UserController {
    constructor(userRepository, userProfileRepo, userService, jwtService, user) {
        this.userRepository = userRepository;
        this.userProfileRepo = userProfileRepo;
        this.userService = userService;
        this.jwtService = jwtService;
        this.user = user;
    }
    async loadUser(id) {
        const userProfile = await this.userRepository.findOne({ where: { email: id } });
        if (!userProfile) {
            throw new rest_1.HttpErrors.NotFound('User profile not found');
        }
        return { user: userProfile };
    }
    async getUser(userId) {
        const usersId = userId[security_1.securityId];
        const user = await this.userRepository.findById(usersId === null || usersId === void 0 ? void 0 : usersId.id);
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('User not found');
        }
        const userProfile = await this.userRepository.findOne({ where: { email: user.email } });
        if (userProfile) {
            return { msg: 'Data from UserProfileDB', user: userProfile };
        }
        else {
            return { msg: 'Data from UserDB SESSION', user: user };
        }
    }
    // Protect this route with JWT authentication
    async getUserProfile(currentUserProfile) {
        return currentUserProfile[security_1.securityId];
    }
    // Protect this route with JWT authentication
    async getUserProfile2(token) {
        // Token will be automatically validated
        return {
            email: token.email,
            [security_1.securityId]: token[security_1.securityId],
            id: token,
            name: token.name
        };
    }
    whoAmI() {
        const userId = this.user[security_1.securityId];
        return userId;
    }
    async updateUser(currentUser, userProfileData // Data to update
    ) {
        try {
            const userId = currentUser[security_1.securityId]; // Access the user ID from the injected user profile
            console.log('User ID:', userId === null || userId === void 0 ? void 0 : userId.id);
            // Fetch the existing user profile by userId
            //const existingProfile = await this.userProfileRepo.findById(userId?.id);
            const existingProfile = await this.userProfileRepo.findOne({
                where: { userId: userId === null || userId === void 0 ? void 0 : userId.id }
            });
            //userProfileData.userId = userId?.id;
            if (existingProfile) {
                console.log('1');
                userProfileData.userId = userId === null || userId === void 0 ? void 0 : userId.id;
                console.log('existingProfile', existingProfile);
                await this.userProfileRepo.updateById(existingProfile.id, userProfileData);
                console.log('runs second line');
                const updatedUserPro = await this.userProfileRepo.findById(existingProfile.id);
                console.log('updatedProfile', updatedUserPro);
                return {
                    msg: 'User Profile Updated',
                    user: updatedUserPro
                };
            }
            else {
                console.log('2');
                userProfileData.userId = userId === null || userId === void 0 ? void 0 : userId.id;
                const newUserProfile = await this.userProfileRepo.create(userProfileData);
                return {
                    msg: 'User Profile Created',
                    user: newUserProfile
                };
            }
        }
        catch (error) {
            throw new rest_1.HttpErrors.BadRequest(error);
        }
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, rest_1.get)('/loadUser/{id}'),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "loadUser", null);
tslib_1.__decorate([
    (0, rest_1.get)('/getUser'),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, (0, core_1.inject)(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/profile'),
    tslib_1.__param(0, (0, core_1.inject)(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
tslib_1.__decorate([
    (0, rest_1.get)('/profile2'),
    (0, authentication_1.authenticate)('jwt'),
    tslib_1.__param(0, rest_1.param.query.string('token')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile2", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/whoami'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], UserController.prototype, "whoAmI", null);
tslib_1.__decorate([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.post)('/updateUser'),
    tslib_1.__param(0, (0, core_1.inject)(authentication_1.AuthenticationBindings.CURRENT_USER)),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, user_profile_model_1.UserProfile // Data to update
    ]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_2.UserProfileRepository)),
    tslib_1.__param(2, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(3, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(4, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_2.UserProfileRepository,
        services_1.UsersService,
        services_1.JwtService, Object])
], UserController);
//# sourceMappingURL=user.controller.js.map