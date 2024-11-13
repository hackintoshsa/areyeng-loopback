import { bind, BindingScope } from '@loopback/core';
import * as bcrypt from 'bcryptjs';

@bind({ scope: BindingScope.SINGLETON })
export class PasswordHasher {
  async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
