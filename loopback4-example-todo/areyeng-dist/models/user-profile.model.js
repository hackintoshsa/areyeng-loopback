"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
let UserProfile = class UserProfile extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.UserProfile = UserProfile;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        generated: true,
        id: true
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "politics", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "interests", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "sports", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "religion", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "prefer", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "drinks", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "smokes", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property.array(String),
    tslib_1.__metadata("design:type", Array)
], UserProfile.prototype, "traits", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'img/avatars/racoon.png',
    }),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "currentImage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: Date.now,
    }),
    tslib_1.__metadata("design:type", Number)
], UserProfile.prototype, "created", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], UserProfile.prototype, "userId", void 0);
exports.UserProfile = UserProfile = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserProfile);
//# sourceMappingURL=user-profile.model.js.map