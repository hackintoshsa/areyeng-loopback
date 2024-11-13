import { Entity } from '@loopback/repository';
import { Travel } from './travel.model';
import { UserProfile } from './user-profile.model';
export declare class User extends Entity {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    currentImage: string;
    gender: string;
    verified: boolean;
    smsMobile?: string;
    smsId?: string;
    resetPasswordToken?: any;
    resetPasswordExpires?: any;
    createdAt: Date;
    updatedAt: Date;
    travels: Travel[];
    userProfile: UserProfile;
    constructor(data?: Partial<User>);
    hashPassword(): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
