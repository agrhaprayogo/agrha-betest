import { Column, Entity } from "typeorm";
import Model from "./model.entity";

@Entity("Accounts")
export default class Account extends Model {
  @Column({
    unique: true,
  })
  userId: string;

  @Column({
    unique: true,
  })
  userName: string;

  @Column()
  password: string;

  @Column()
  lastLoginDate: string;
}
