import { User } from '../models';
import { Error400, Error401, Error500 } from '../utils';
export declare const RegisterUserSchema: {
    summary: string;
    description: string;
    responses: {
        '200': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof User;
                    };
                };
            };
        };
        '400': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Error400;
                    };
                };
            };
        };
        '401': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Error401;
                    };
                };
            };
        };
        '500': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Error500;
                    };
                };
            };
        };
    };
};
export declare const RegisterUserRequestBody: {
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                properties: {
                    firstname: {
                        type: string;
                        description: string;
                    };
                    lastname: {
                        type: string;
                        description: string;
                    };
                    email: {
                        type: string;
                        description: string;
                    };
                    password: {
                        type: string;
                        description: string;
                    };
                    gender: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
        };
    };
};
export declare const LoginUserSchema: {
    summary: string;
    description: string;
    responses: {
        '200': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            token: {
                                type: string;
                                description: string;
                            };
                            user: {
                                type: string;
                                properties: {
                                    id: {
                                        type: string;
                                        description: string;
                                    };
                                    firstname: {
                                        type: string;
                                        description: string;
                                    };
                                    lastname: {
                                        type: string;
                                        description: string;
                                    };
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                description: string;
                            };
                        };
                    };
                };
            };
        };
        '400': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Error400;
                    };
                };
            };
        };
        '401': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Error401;
                    };
                };
            };
        };
        '500': {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Error500;
                    };
                };
            };
        };
    };
};
export declare const LoginUserRequestBody: {
    type: string;
    properties: {
        email: {
            type: string;
            description: string;
        };
        password: {
            type: string;
            description: string;
        };
    };
    required: string[];
};
export declare const userSpec: {
    SOURCE_IDENTIFIER: string;
    TRANSACTION_ID: string;
    MSISDN: string;
};
