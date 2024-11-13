"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const core_1 = require("@loopback/core");
const datasources_1 = require("../datasources");
let UserProfileRepository = class UserProfileRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.UserProfile, dataSource);
    }
};
exports.UserProfileRepository = UserProfileRepository;
exports.UserProfileRepository = UserProfileRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDbDataSource])
], UserProfileRepository);
//# sourceMappingURL=user-profile.repository.js.map