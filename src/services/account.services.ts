import { AccountDto } from "@dtos/account.dto";
import Account from "@entities/account.entity";
import { AppDataSource } from "@utils/dataSource";
import { DataSource, LessThan, MoreThan } from "typeorm";

export class AccountServices {
  constructor(dataSource: DataSource = AppDataSource) {
    this.dataSource = dataSource;
    this.accountRepository = this.dataSource.getMongoRepository(Account);
  }
  private dataSource;
  private accountRepository;

  async createAccount(input: AccountDto) {
    const createdAccount = this.accountRepository.create(input);
    return await this.accountRepository.save(createdAccount);
  }

  async findAccountByUsername(payload:string) {
    console.log("REPO PAYLOAD", payload)
    const result = await this.accountRepository.find({
      where: {
        userName: payload,
      },
    });
    return result;
  }

  async findAccountByLastLoginDate() {
    const timeElapsed = Date.now();
    const day = new Date(timeElapsed);
    day.setDate(day.getDate()-3)
    const loginDay = JSON.stringify(day)
    const result = await this.accountRepository.find({
      where: {
        lastLoginDate: LessThan(loginDay),
      },
    });
    return result;
  }
}
