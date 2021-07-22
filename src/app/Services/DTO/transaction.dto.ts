import { AccountDTO } from './accountSearch';

export interface TransactionDTO {
  _id?: string;
  originID?: AccountDTO;
  destinationID: AccountDTO;
  amount: string;
}
