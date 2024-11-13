import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';  // Assuming you have the User model already defined

@model()
export class Notification extends Entity {
  @belongsTo(() => User)
  userId: string;  // Reference to the User model

  @property({
    type: 'string',
    default: 'pending', // Default state is 'pending'
  })
  state: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @property({
    type: 'date',
  })
  date?: Date;

  @property({
    type: 'date',
  })
  dateviewed?: Date;

  constructor(data?: Partial<Notification>) {
    super(data);
  }
}
