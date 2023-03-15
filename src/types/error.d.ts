import { QueryFailedError } from "typeorm";

type ErrorWithCode = QueryFailedError & {
  code: string;
};
