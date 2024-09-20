export type BaseEntityConstructorProps = {
  _id: string;
  createdAt: Date | string;
};

export abstract class BaseEntity {
  readonly _id: string;
  readonly createdAt: Date;
  constructor(attributes: BaseEntityConstructorProps){
    this._id = attributes._id;
    this.createdAt = new Date(attributes.createdAt);
  }
}