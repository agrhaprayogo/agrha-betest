import { deleteAllUser } from "@controllers/user.controller";
import { UserDto } from "@dtos/user.dto";
import User from "@entities/user.entity";
import { AppDataSource } from "@utils/dataSource";
import { DataSource, In } from "typeorm";

export class UserServices {
  constructor(dataSource: DataSource = AppDataSource) {
    this.dataSource = dataSource;
    this.userRepository = this.dataSource.getMongoRepository(User);
  }
  private dataSource;
  private userRepository;

  async createUser(input: UserDto) {
    const createdUser = this.userRepository.create(input);
    return await this.userRepository.save(createdUser);
  }

  async findAllUsers() {
    const result = await this.userRepository.find();
    return result;
  }

  async deleteAllUsers() {
    const result = await this.userRepository.delete({});
    return result;
  }

  async findUsersByAccountNumber(payload: string) {
    const result = await this.userRepository.find({
      where: {
        accountNumber: payload,
      },
    });
    return result;
  }

  async findUsersByRegistrationNumber(payload: string) {
    const result = await this.userRepository.find({
      where: {
        registrationNumber: payload,
      },
    });
    return result;
  }

  async findUserByUserId(payload: string) {
    const result = await this.userRepository.find({
      where: {
        userId: payload,
      },
    });
    return result;
  }

  async findManyUsersByUserIds(payload: string[]) {
    const result = await this.userRepository.find({
      where: {
        userId : In(payload)
      }
    });
    return result;
  }
}
