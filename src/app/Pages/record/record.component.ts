import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '../../Services/message.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransactionService } from 'src/app/Services/transaction.service';
import { TransactionDTO } from 'src/app/Services/DTO/transaction.dto';
import { BankService } from 'src/app/Services/bank.service';
import { BankDTO, BankResponse } from 'src/app/Services/DTO/bank.dto';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
})
export class RecordComponent implements OnInit {
  recordList: TransactionDTO[] = [];
  isLoading = false;
  bankList: BankResponse[] = [];

  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
    private message: NzMessageService,
    private bankService: BankService
  ) {}

  async ngOnInit(): Promise<void> {
    //Init Bank List
    try {
      this.bankList = (await this.bankService.getBanks().toPromise()).banks;
    } catch {
      this.messageService.add('Error in Bank Service');
    }

    console.log(this.bankList);
    console.log(this.bankName('0000001'));

    //Init dataSet Table
    try {
      this.recordList = await this.transactionService
        .getTransactions()
        .toPromise();
    } catch {
      this.messageService.add('Error in Transaction Service');
    }
  }

  public formatRut(inRut: string): string {
    console.log(inRut);
    let rut = inRut;
    rut = rut.replace('.', '').replace('-', '');
    const module = rut.substr(rut.length - 1);
    rut = rut.slice(0, -1);
    rut = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    rut = rut + `-${module}`;
    return rut;
  }

  formatterCLP = (value: number) => (value > 0 ? `$ ${value}` : ' ');

  bankName = (bankID: string): string[] =>
    this.bankList
      .filter((bank) => bank.id.toString() == bankID)
      .map((bank) => bank.name);
}
