"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Travel = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
const user_profile_model_1 = require("./user-profile.model");
const comment_model_1 = require("./comment.model");
let Travel = class Travel extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Travel = Travel;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "userType", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_profile_model_1.UserProfile),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "profileId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "fromAddress", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "toAddress", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Travel.prototype, "from", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Travel.prototype, "to", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "travelTime", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "distance", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "createdOn", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "pickUpTime", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Travel.prototype, "pickUpDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Travel.prototype, "seats", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Travel.prototype, "onetime", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => user_model_1.User),
    tslib_1.__metadata("design:type", Array)
], Travel.prototype, "joins", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => user_model_1.User),
    tslib_1.__metadata("design:type", Array)
], Travel.prototype, "requestedJoins", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => comment_model_1.Comment),
    tslib_1.__metadata("design:type", Array)
], Travel.prototype, "comments", void 0);
exports.Travel = Travel = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Travel);
//# sourceMappingURL=travel.model.js.map