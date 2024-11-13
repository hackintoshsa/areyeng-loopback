"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHasher = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const bcrypt = tslib_1.__importStar(require("bcryptjs"));
let PasswordHasher = class PasswordHasher {
    async comparePassword(candidatePassword, hashedPassword) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
};
exports.PasswordHasher = PasswordHasher;
exports.PasswordHasher = PasswordHasher = tslib_1.__decorate([
    (0, core_1.bind)({ scope: core_1.BindingScope.SINGLETON })
], PasswordHasher);
//# sourceMappingURL=password.hasher.js.map