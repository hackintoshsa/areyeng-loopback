"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model"); // Assuming you have the User model already defined
let Notification = class Notification extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Notification = Notification;
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'pending', // Default state is 'pending'
    }),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "state", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "type", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "message", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Notification.prototype, "link", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], Notification.prototype, "date", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], Notification.prototype, "dateviewed", void 0);
exports.Notification = Notification = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Notification);
//# sourceMappingURL=notification.model.js.map