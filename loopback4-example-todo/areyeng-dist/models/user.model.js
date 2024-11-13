"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const bcrypt = tslib_1.__importStar(require("bcryptjs"));
const travel_model_1 = require("./travel.model");
const user_profile_model_1 = require("./user-profile.model");
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
    async hashPassword() {
        if (this.password) {
            console.log(this.password);
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
    async comparePassword(candidatePassword) {
        console.log(this.password, candidatePassword);
        return bcrypt.compare(candidatePassword, this.password);
    }
};
exports.User = User;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true, // Do not auto-generate, as MongoDB will handle this
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true, // Make firstname required for registration
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true, // Make lastname required for registration
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        unique: true,
        required: true, // Make email required for registration
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        hidden: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'img/avatars/racoon.png',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "currentImage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "smsMobile", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "smsId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "resetPasswordToken", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "resetPasswordExpires", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => travel_model_1.Travel),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "travels", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => user_profile_model_1.UserProfile),
    tslib_1.__metadata("design:type", user_profile_model_1.UserProfile)
], User.prototype, "userProfile", void 0);
exports.User = User = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
//# sourceMappingURL=user.model.js.map