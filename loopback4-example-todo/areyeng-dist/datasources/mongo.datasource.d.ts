import { juggler } from '@loopback/repository';
import { LifeCycleObserver } from '@loopback/core';
export declare class MongoDbDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
        user: string;
        password: string;
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    };
    constructor(dsConfig?: object);
}
