"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const rest_1 = require("@loopback/rest");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const security_1 = require("@loopback/security");
const keys_1 = require("../keys");
let JwtService = class JwtService {
    constructor(userRepository, expireIn, jwtSecret) {
        this.userRepository = userRepository;
        this.expireIn = expireIn;
        this.jwtSecret = jwtSecret;
        this.name = 'jwt';
    }
    async generateToken(user) {
        if (!user.id) {
            throw new Error('User ID is required to generate a token.');
        }
        if (!user) {
            throw new rest_1.HttpErrors.Unauthorized('Error while generating token :userProfile is null');
        }
        console.log(this.expireIn, this.jwtSecret);
        return jwt.sign(user, this.jwtSecret, {
            expiresIn: this.expireIn,
            algorithm: 'HS256'
        });
        // const payload = {
        //   iss: 'http://localhost:3000',
        //   sub: user.id.toString(), // Ensure user ID is a string
        //   iat: moment().unix(),
        //   exp: moment().add(1, 'day').unix(),
        // };
        // return jwt.sign(payload, this.jwtSecret, { algorithm: 'HS256' });
    }
    async verifyToken(tokenValue) {
        if (!tokenValue) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token:'token' is null demo`);
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
                [security_1.securityId]: payload,
                id: payload.sub,
                name: payload.sub,
                permissions: payload.sub,
            };
            return userProfile;
        }
        catch (error) {
            console.log(error);
            throw new Error('Invalid token: ' + error.message);
        }
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN)),
    tslib_1.__param(2, (0, core_1.inject)(keys_1.TokenServiceBindings.TOKEN_SECRET)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository, String, String])
], JwtService);
//# sourceMappingURL=jwt.service.js.map