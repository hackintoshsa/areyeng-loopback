import { Entity } from '@loopback/repository';
export declare class Notification extends Entity {
    userId: string;
    state: string;
    type?: string;
    message?: string;
    link?: string;
    date?: Date;
    dateviewed?: Date;
    constructor(data?: Partial<Notification>);
}
