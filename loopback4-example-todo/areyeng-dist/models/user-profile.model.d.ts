import { Entity } from '@loopback/repository';
export declare class UserProfile extends Entity {
    id: string;
    email: string;
    firstname?: string;
    lastname?: string;
    politics?: string;
    interests?: string;
    sports?: string;
    religion?: string;
    prefer?: string;
    drinks?: string;
    smokes?: string;
    description?: string;
    traits: string[];
    currentImage: string;
    created: number;
    userId: string;
    constructor(data?: Partial<UserProfile>);
}
