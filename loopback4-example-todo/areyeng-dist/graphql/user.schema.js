"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSpec = exports.LoginUserRequestBody = exports.LoginUserSchema = exports.RegisterUserRequestBody = exports.RegisterUserSchema = void 0;
// src/graphql/user.schema.ts
const models_1 = require("../models");
const utils_1 = require("../utils"); // Assuming error models are shared
// Define the response schema for User Registration
exports.RegisterUserSchema = {
    summary: 'This API registers a new user by providing required details such as email, password, name, and gender.',
    description: 'This API allows new users to register by providing necessary details like their first name, last name, email address, password, and gender. Upon successful registration, a JWT token will be returned for authentication.',
    responses: {
        '200': {
            description: 'User registration successful',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': models_1.User,
                    },
                },
            },
        },
        '400': {
            description: 'Bad Request, missing or invalid fields in the request body',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': utils_1.Error400,
                    },
                },
            },
        },
        '401': {
            description: 'Authentication information is missing or invalid',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': utils_1.Error401,
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error, failure during user registration',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': utils_1.Error500,
                    },
                },
            },
        },
    },
};
// Register User Request Body Schema (structure of the user details for registration)
exports.RegisterUserRequestBody = {
    description: 'User registration details including personal information, email, and password.',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    firstname: {
                        type: 'string',
                        description: 'First name of the user.',
                    },
                    lastname: {
                        type: 'string',
                        description: 'Last name of the user.',
                    },
                    email: {
                        type: 'string',
                        description: 'Email address of the user. Must be unique.',
                    },
                    password: {
                        type: 'string',
                        description: 'Password for the user account. It will be hashed before storing.',
                    },
                    gender: {
                        type: 'string',
                        description: 'Gender of the user.',
                    },
                },
                required: ['firstname', 'lastname', 'email', 'password', 'gender'],
            },
        },
    },
};
// Define the response schema for User Login
exports.LoginUserSchema = {
    summary: 'This API allows a registered user to log in using their email and password.',
    description: 'This API allows users to authenticate by providing their registered email and password. Upon successful login, a JWT token will be returned for future requests.',
    responses: {
        '200': {
            description: 'Login successful, returns the JWT token for authentication',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            token: {
                                type: 'string',
                                description: 'JWT token used for authentication in subsequent requests.',
                            },
                            user: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', description: 'Unique user ID' },
                                    firstname: { type: 'string', description: 'First name of the user' },
                                    lastname: { type: 'string', description: 'Last name of the user' },
                                    email: { type: 'string', description: 'Email of the user' },
                                },
                                description: 'User details excluding the password.',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Bad Request, missing or invalid fields in the request body',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': utils_1.Error400,
                    },
                },
            },
        },
        '401': {
            description: 'Unauthorized, invalid email or password',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': utils_1.Error401,
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error, failure during user login',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': utils_1.Error500,
                    },
                },
            },
        },
    },
};
// Login User Request Body Schema (structure of the user login details)
exports.LoginUserRequestBody = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            description: 'Email address of the user.',
        },
        password: {
            type: 'string',
            description: 'Password of the user.',
        },
    },
    required: ['email', 'password'],
};
// Spec for the fields used in Register and Login API
exports.userSpec = {
    SOURCE_IDENTIFIER: 'Identifies the source system which integrates with SOA.',
    TRANSACTION_ID: 'Unique identifier for every request to SOA.',
    MSISDN: 'MSISDN number of the customer',
};
//# sourceMappingURL=user.schema.js.map