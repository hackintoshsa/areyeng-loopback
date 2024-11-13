import { Entity } from '@loopback/repository';
import { User } from './user.model';
import { Comment } from './comment.model';
export interface GeoPoint {
    latitude: number;
    longitude: number;
}
export declare class Travel extends Entity {
    title: string;
    userId: string;
    userType?: string;
    profileId: string;
    fromAddress?: string;
    toAddress?: string;
    from: GeoPoint;
    to: GeoPoint;
    travelTime?: string;
    distance?: string;
    createdOn: string;
    pickUpTime?: string;
    pickUpDate?: string;
    seats?: number;
    onetime: boolean;
    joins: User[];
    requestedJoins: User[];
    comments: Comment[];
    constructor(data?: Partial<Travel>);
}
