import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import * as bcrypt from 'bcryptjs';
import {Travel} from './travel.model';
import {UserProfile} from './user-profile.model';

@model()
export class User extends Entity {
  @property({
    type: 'string', // Use 'string' for ObjectId representation
    id: true,
    generated: true, // Do not auto-generate, as MongoDB will handle this
  })
  id: string;  // This will map to the '_id' field in MongoDB (using ObjectId)

  @property({
    type: 'string',
    required: true,  // Make firstname required for registration
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,  // Make lastname required for registration
  })
  lastname: string;

  @property({
    type: 'string',
    unique: true,
    required: true,  // Make email required for registration
  })
  email: string;

  @property({
    type: 'string',
    required: true,  // Make password required for registration
    hidden: true
  })
  password: string;

  @property({
    type: 'string',
    default: 'img/avatars/racoon.png',
  })
  currentImage: string;

  @property({
    type: 'string',
    required: true
  })
  gender: string;

  @property({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @property({
    type: 'string',
  })
  smsMobile?: string;

  @property({
    type: 'string',
  })
  smsId?: string;

  @property({
    type: 'string',
  })
  resetPasswordToken?: any;

  @property({
    type: 'date',
  })
  resetPasswordExpires?: any;


  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt: Date;

  @hasMany(() => Travel)
  travels: Travel[];

  // Define a relation: A user can have one user profile
  @hasOne(() => UserProfile)
  userProfile: UserProfile;

  constructor(data?: Partial<User>) {
    super(data);
  }

  async hashPassword(): Promise<void> {
    if (this.password) {
      console.log(this.password)
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    console.log(this.password, candidatePassword)
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
