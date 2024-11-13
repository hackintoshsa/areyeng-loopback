import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Comment extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}
