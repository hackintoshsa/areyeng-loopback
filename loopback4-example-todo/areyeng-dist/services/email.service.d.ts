interface MailConfig {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
}
export declare class EmailService {
    private mailConfig;
    constructor(mailConfig: MailConfig);
    sendResetPasswordEmail(email: string, token: string, host: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
export declare const getMailConfig: () => MailConfig;
export {};
