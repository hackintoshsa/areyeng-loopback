"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceBindings = exports.TokenServiceBindings = exports.ServiceConstants = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var ServiceConstants;
(function (ServiceConstants) {
    var _a, _b;
    ServiceConstants.TOKEN_SECRET_VALUE = (_a = process.env.TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'hackintoshsateam';
    ServiceConstants.TOKEN_EXPIRES_IN_VALUE = (_b = process.env.TOKEN_EXPIRES_IN) !== null && _b !== void 0 ? _b : '1h';
})(ServiceConstants || (exports.ServiceConstants = ServiceConstants = {}));
var TokenServiceBindings;
(function (TokenServiceBindings) {
    TokenServiceBindings.TOKEN_SECRET = core_1.BindingKey.create('authentication.jwt.secret');
    TokenServiceBindings.TOKEN_EXPIRES_IN = core_1.BindingKey.create('authentication.jwt.expires.in.seconds');
    TokenServiceBindings.TOKEN_SERVICE = core_1.BindingKey.create('services.authentication.jwt.tokenservice');
})(TokenServiceBindings || (exports.TokenServiceBindings = TokenServiceBindings = {}));
var UserServiceBindings;
(function (UserServiceBindings) {
    UserServiceBindings.USER_SERVICE = core_1.BindingKey.create('services.user.service');
})(UserServiceBindings || (exports.UserServiceBindings = UserServiceBindings = {}));
//# sourceMappingURL=keys.js.map