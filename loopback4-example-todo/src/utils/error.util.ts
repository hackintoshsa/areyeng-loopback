import {HttpErrors} from '@loopback/rest';

export class Error400 extends HttpErrors[400] {
  constructor(message: string = 'Bad Request', details: any = {}) {
    super(message);
    this.details = details;
  }

  details: any;
}

export class Error401 extends HttpErrors[401] {
  constructor(message: string = 'Unauthorized', details: any = {}) {
    super(message);
    this.details = details;
  }

  details: any;
}

export class Error500 extends HttpErrors[500] {
  constructor(message: string = 'Internal Server Error', details: any = {}) {
    super(message);
    this.details = details;
  }

  details: any;
}