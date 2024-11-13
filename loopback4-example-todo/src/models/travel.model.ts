import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {UserProfile} from './user-profile.model';
import {Comment} from './comment.model';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

@model()
export class Travel extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @belongsTo(() => User)
  userId: string;

  @property({
    type: 'string',
  })
  userType?: string;

  @belongsTo(() => UserProfile)
  profileId: string;

  @property({
    type: 'string',
  })
  fromAddress?: string;

  @property({
    type: 'string',
  })
  toAddress?: string;

  @property({
    type: 'object',
    required: true,
  })
  from: GeoPoint;  // GeoJSON for 'from' location

  @property({
    type: 'object',
    required: true,
  })
  to: GeoPoint;  // GeoJSON for 'to' location

  @property({
    type: 'string',
  })
  travelTime?: string;

  @property({
    type: 'string',
  })
  distance?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdOn: string;

  @property({
    type: 'string',
  })
  pickUpTime?: string;

  @property({
    type: 'string',
  })
  pickUpDate?: string;

  @property({
    type: 'number',
  })
  seats?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  onetime: boolean;

  @hasMany(() => User)
  joins: User[];

  @hasMany(() => User)
  requestedJoins: User[];

  @hasMany(() => Comment)
  comments: Comment[];

  constructor(data?: Partial<Travel>) {
    super(data);
  }
}
