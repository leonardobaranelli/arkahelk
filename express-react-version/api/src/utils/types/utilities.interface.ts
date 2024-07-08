import { Property } from '../decorators/property.decorator';

type MaybeString = string | null;

export interface IError extends Error {
  statusCode?: number;
}

export interface IUserPublic {
  id: string;
  name: string;
  lastName: string;
  username: string;
}

// Abstract class representing a public user with metadata
export class AbstractUserPublic {
  @Property()
  id!: string;
  @Property()
  name!: string;
  @Property()
  lastName!: string;
  @Property()
  username!: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.lastName = '';
    this.username = '';
  }
}

export interface IConnectorPublic {
  id: string;
  name: string;
  apiUrl?: MaybeString;
}

// Abstract class representing a public connector with metadata
export class AbstractConnectorPublic {
  @Property()
  id!: string;
  @Property()
  name!: string;
  @Property()
  apiUrl?: MaybeString;

  constructor() {
    this.id = '';
    this.name = '';
    this.apiUrl = null;
  }
}
