"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDataSource = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const core_1 = require("@loopback/core");
const config = {
    name: 'mongodb',
    connector: 'mongodb',
    url: 'mongodb://localhost:27017/your-database-name',
    user: '',
    password: '',
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
let MongoDbDataSource = class MongoDbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
exports.MongoDbDataSource = MongoDbDataSource;
MongoDbDataSource.dataSourceName = 'mongodb';
MongoDbDataSource.defaultConfig = config;
exports.MongoDbDataSource = MongoDbDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mongodb', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongoDbDataSource);
//# sourceMappingURL=mongo.datasource.js.map