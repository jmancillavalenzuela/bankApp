import { AccountDTO } from './account.dto';

export interface TransactionDTO {
  _id?: string;
  originID?: AccountDTO;
  destinationID: AccountDTO;
  amount: number;
}
