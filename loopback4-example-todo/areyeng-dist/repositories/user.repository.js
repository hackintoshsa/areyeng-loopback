"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const core_1 = require("@loopback/core");
const datasources_1 = require("../datasources");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.User, dataSource);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDbDataSource])
], UserRepository);
//# sourceMappingURL=user.repository.js.map