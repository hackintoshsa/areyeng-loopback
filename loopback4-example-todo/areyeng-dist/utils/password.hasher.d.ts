export declare class PasswordHasher {
    comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
