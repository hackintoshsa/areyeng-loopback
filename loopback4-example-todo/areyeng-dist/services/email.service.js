"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailConfig = exports.EmailService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
let EmailService = class EmailService {
    constructor(mailConfig) {
        this.mailConfig = mailConfig;
    }
    sendResetPasswordEmail(email, token, host) {
        const transporter = nodemailer_1.default.createTransport(this.mailConfig);
        const mailOptions = {
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://${host}/reset/${token}\n\n` +
                `If you did not request this, please ignore this email.\n`,
        };
        return transporter.sendMail(mailOptions);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('mail.config')),
    tslib_1.__metadata("design:paramtypes", [Object])
], EmailService);
const getMailConfig = () => {
    var _a, _b, _c;
    return {
        host: (_a = process.env.MAIL_HOST) !== null && _a !== void 0 ? _a : '',
        port: Number(process.env.MAIL_PORT) || 587,
        auth: {
            user: (_b = process.env.MAIL_USER) !== null && _b !== void 0 ? _b : '',
            pass: (_c = process.env.MAIL_PASS) !== null && _c !== void 0 ? _c : '',
        },
    };
};
exports.getMailConfig = getMailConfig;
//# sourceMappingURL=email.service.js.map