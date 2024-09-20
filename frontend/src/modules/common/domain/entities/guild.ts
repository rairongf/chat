import { BaseEntity, BaseEntityConstructorProps } from "./base";
import { User } from "./user";

export type GuildConstructorProps = BaseEntityConstructorProps & {
  name: string;
  picture?: string;
  members: User['_id'][];
};

export class Guild extends BaseEntity {
  readonly name: string;
  readonly picture?: string;
  readonly members: User['_id'][];

  constructor(attributes: GuildConstructorProps){
    super({ ...attributes });
    this.name = attributes.name;
    this.picture = attributes.picture;
    this.members = [...attributes.members];
  }
}