"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error500 = exports.Error401 = exports.Error400 = void 0;
const rest_1 = require("@loopback/rest");
class Error400 extends rest_1.HttpErrors[400] {
    constructor(message = 'Bad Request', details = {}) {
        super(message);
        this.details = details;
    }
}
exports.Error400 = Error400;
class Error401 extends rest_1.HttpErrors[401] {
    constructor(message = 'Unauthorized', details = {}) {
        super(message);
        this.details = details;
    }
}
exports.Error401 = Error401;
class Error500 extends rest_1.HttpErrors[500] {
    constructor(message = 'Internal Server Error', details = {}) {
        super(message);
        this.details = details;
    }
}
exports.Error500 = Error500;
//# sourceMappingURL=error.util.js.map