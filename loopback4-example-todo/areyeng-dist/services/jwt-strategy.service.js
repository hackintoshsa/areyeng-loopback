"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategyService = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const core_1 = require("@loopback/core");
const jwt_service_1 = require("./jwt.service");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
let JwtStrategyService = class JwtStrategyService {
    constructor(tokenService) {
        this.tokenService = tokenService;
        this.name = 'jwt';
    }
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
            const payload = await this.tokenService.verifyToken(tokenValue);
            console.log(payload);
            // Create a UserProfile based on the token payload
            const userProfile = {
                [security_1.securityId]: payload.sub,
                name: payload.sub,
                email: payload.sub,
                payload // Placeholder for email, can be fetched from the database if needed
            };
            console.log(payload, userProfile);
            return userProfile;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized('Invalid or expired token');
        }
    }
    extractCredentials(request) {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return ''; // If no Authorization header is found, return an empty string
        }
        const parts = authHeader.split(' ');
        console.log(parts);
        if (parts.length === 2 && parts[0] === 'Bearer') {
            return parts[1]; // Return the token part if it's in the "Bearer <token>" format
        }
        return ''; // Return empty string if the token format is incorrect
    }
};
exports.JwtStrategyService = JwtStrategyService;
exports.JwtStrategyService = JwtStrategyService = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [jwt_service_1.JwtService])
], JwtStrategyService);
//# sourceMappingURL=jwt-strategy.service.js.map