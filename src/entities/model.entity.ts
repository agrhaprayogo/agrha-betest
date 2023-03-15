import {
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
  BaseEntity,
} from "typeorm";

export default abstract class Model extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;
}
