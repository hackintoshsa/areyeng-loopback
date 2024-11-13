import { Entity } from '@loopback/repository';
export declare class Comment extends Entity {
    content: string;
    userId: string;
    constructor(data?: Partial<Comment>);
}
