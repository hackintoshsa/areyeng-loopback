"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenServiceImplementation = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
const bcrypt = tslib_1.__importStar(require("bcryptjs"));
let TokenServiceImplementation = class TokenServiceImplementation {
    constructor(jwtSecret, userRepository) {
        this.jwtSecret = jwtSecret;
        this.userRepository = userRepository;
        this.name = 'jwt';
    }
    // async generateToken(user: UserProfile): Promise<string> {
    //   if (!user.id) {
    //     throw new Error('User ID is required to generate a token.');
    //   }
    //
    //   if (!user) {
    //     throw new HttpErrors.Unauthorized('Error while generating token :userProfile is null')
    //   }
    //   console.log(user)
    //   return jwt.sign(user, this.jwtSecret, {
    //     expiresIn: '5m',
    //     algorithm: 'HS256'
    //   })
    //   // const payload = {
    //   //   iss: 'http://localhost:3000',
    //   //   sub: user.id.toString(), // Ensure user ID is a string
    //   //   iat: moment().unix(),
    //   //   exp: moment().add(1, 'day').unix(),
    //   // };
    //   // return jwt.sign(payload, this.jwtSecret, { algorithm: 'HS256' });
    // }
    async generateToken(userProfile) {
        return jwt.sign(userProfile, this.jwtSecret, {
            expiresIn: '5m',
            algorithm: 'HS256'
        });
    }
    //Verify and decode the JWT token
    async verifyToken(tokenValue) {
        console.log('sss');
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
    // Authenticate and return UserProfile from the JWT token
    async authenticate(request) {
        const authHeader = request.headers['authorization'];
        // Ensure the token is in the 'Bearer <token>' format
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
            throw new rest_1.HttpErrors.Unauthorized('Authorization token must be in Bearer format');
        }
        const tokenValue = this.extractCredentials(request);
        if (!tokenValue) {
            throw new rest_1.HttpErrors.Unauthorized('Token not found');
        }
        try {
            // Verify the token and get the payload
            const payload = await this.verifyToken(tokenValue);
            // Create a UserProfile based on the token payload
            const userProfile = {
                [security_1.securityId]: payload.sub,
                name: payload.sub,
                email: payload.sub,
                payload // Placeholder for email, can be fetched from the database if needed
            };
            return userProfile;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized('Invalid or expired token');
        }
    }
    // Extract the JWT token from the request's Authorization header
    extractCredentials(request) {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return ''; // If no Authorization header is found, return an empty string
        }
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1]; // Return the token part if it's in the "Bearer <token>" format
        }
        return ''; // Return empty string if the token format is incorrect
    }
    async convertToUserProfile(user) {
        const userName = (user.firstname || '') + (user.lastname ? ' ' + user.lastname : '');
        return {
            [security_1.securityId]: user.id.toString(),
            name: userName,
            id: user.id,
            email: user.email,
            user
        };
    }
    async verifyCredentials(credentials) {
        try {
            // Option 1: Verify against database (e.g., using username and password)
            const user = await this.userRepository.findOne({
                where: { email: credentials.email }, // Assuming username is email
            });
            if (!user) {
                throw new rest_1.HttpErrors.Unauthorized('Incorrect email or password');
            }
            // Assuming we use bcrypt or similar to compare passwords
            const passwordMatch = await bcrypt.compare(credentials.password, user.password);
            if (!passwordMatch) {
                throw new rest_1.HttpErrors.Unauthorized('Incorrect password');
            }
            return user;
        }
        catch (err) {
            // Handle any other errors, e.g., network or server errors
            throw new rest_1.HttpErrors.InternalServerError('Authentication failed');
        }
    }
};
exports.TokenServiceImplementation = TokenServiceImplementation;
exports.TokenServiceImplementation = TokenServiceImplementation = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('jwt.secret')),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [String, repositories_1.UserRepository])
], TokenServiceImplementation);
//# sourceMappingURL=token.service.js.map