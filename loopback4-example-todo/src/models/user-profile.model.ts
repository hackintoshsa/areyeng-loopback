import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class UserProfile extends Entity {
  @property({
    type: 'string', // Use 'string' for MongoDB ObjectId or you can use 'number' or another type depending on your database
    generated: true, // Set to true if the ID is auto-generated (e.g., MongoDB's ObjectId)
    id: true
  })
  id: string;  // ID field is now required

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @property({
    type: 'string',
  })
  politics?: string;

  @property({
    type: 'string',
  })
  interests?: string;

  @property({
    type: 'string',
  })
  sports?: string;

  @property({
    type: 'string',
  })
  religion?: string;

  @property({
    type: 'string',
  })
  prefer?: string;

  @property({
    type: 'string',
  })
  drinks?: string;

  @property({
    type: 'string',
  })
  smokes?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property.array(String)
  traits: string[];

  @property({
    type: 'string',
    default: 'img/avatars/racoon.png',
  })
  currentImage: string;

  @property({
    type: 'number',
    default: Date.now,
  })
  created: number;

  @belongsTo(() => User)
  userId: string; // Reference to the User model

  constructor(data?: Partial<UserProfile>) {
    super(data);
  }
}
