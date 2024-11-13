/// <reference types="http-errors" />
import { HttpErrors } from '@loopback/rest';
declare const Error400_base: HttpErrors.HttpErrorConstructor<400>;
export declare class Error400 extends Error400_base {
    constructor(message?: string, details?: any);
    details: any;
}
declare const Error401_base: HttpErrors.HttpErrorConstructor<401>;
export declare class Error401 extends Error401_base {
    constructor(message?: string, details?: any);
    details: any;
}
declare const Error500_base: HttpErrors.HttpErrorConstructor<500>;
export declare class Error500 extends Error500_base {
    constructor(message?: string, details?: any);
    details: any;
}
export {};
