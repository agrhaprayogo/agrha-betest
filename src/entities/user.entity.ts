import { Column, Entity} from "typeorm";
import Model from "./model.entity";

@Entity("Users")
export default class User extends Model {
  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  accountNumber: string;

  @Column({
    unique: true,
  })
  registrationNumber: string;

  @Column({
    unique: true,
  })
  emailAddress: string;

  @Column({
    unique: true,
  })
  userId: string;
}
