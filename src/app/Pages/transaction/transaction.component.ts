import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../Services/account.service';
import { MessageService } from '../../Services/message.service';
import { TransactionService } from '../../Services/transaction.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountDTO } from 'src/app/Services/DTO/account.dto';
import { TransactionDTO } from 'src/app/Services/DTO/transaction.dto';
import { formatRut } from 'src/app/shared/utils';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.less'],
})
export class TransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  accountList: AccountDTO[] = [];
  nzFilterOption = () => true;
  isLoading = false;
  /// Account Info
  infoAccount!: AccountDTO;
  showInfo: boolean = false;

  submitForm(): void {
    for (const formInput in this.transactionForm.controls) {
      if (this.transactionForm.controls.hasOwnProperty(formInput)) {
        this.transactionForm.controls[formInput].markAsDirty();
        this.transactionForm.controls[formInput].updateValueAndValidity();
      }
    }
    this.saveForm();
  }

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private transactionService: TransactionService,
    private message: NzMessageService
  ) {}

  async ngOnInit(): Promise<void> {
    //Init Form
    this.transactionForm = this.fb.group({
      destination: [null, [Validators.required]],
      amount: [null, Validators.required],
    });
    //Init Destination Rut Select Search
    try {
      this.accountList = await this.accountService.getAccounts().toPromise();
    } catch {
      this.messageService.add('Error in Bank Service');
    }
    if (this.accountList.length < 0) {
      this.message.info('No hay Cuentas Registradas', {
        nzDuration: 5000,
      });
    }
  }

  public async saveForm(): Promise<void> {
    if (this.transactionForm.status === 'VALID') {
      const makeTransaction = this.transactionForm.value;
      let registerTransaction = {
        destinationID: this.infoAccount,
        amount: makeTransaction.amount,
      } as TransactionDTO;
      //SAVE FORM
      try {
        let response = await this.transactionService
          .createTransaction(registerTransaction)
          .toPromise();
        if (response._id) {
          this.message.success(`Transacción Realizada Exitosamente`);
        } else {
          this.message.error('Hubo un problema en Realizar su Transacción');
        }
      } catch {
        this.messageService.add('Error in Transaction Service');
      }
    }
  }

  async search(value: string): Promise<void> {
    if (value === '') {
      try {
        this.accountList = await this.accountService.getAccounts().toPromise();
      } catch {
        this.message.error('Hubo un problema en Realizar su Transacción');
        this.messageService.add('Error in Account Service');
      }
    }
    const search = this.accountList.filter((account) =>
      account.rut.startsWith(value)
    );
    this.accountList = search;
    // Init account info
    this.transactionForm.get('destination')!.value;
  }

  async info(id: any) {
    const accountSelected = await this.accountService
      .getAccountByID(id)
      .toPromise();
    if (accountSelected) {
      this.showInfo = true;
      this.infoAccount = accountSelected;
    } else {
      this.showInfo = false;
    }
  }
  //Desacoplar en Utils
  formatterCLP = (value: number) => (value > 0 ? `$ ${value}` : ' ');

  formatRut(inRut: string): string {
    console.log(inRut);
    let rut = inRut;
    rut = rut.replace('.', '').replace('-', '');
    const module = rut.substr(rut.length - 1);
    rut = rut.slice(0, -1);
    rut = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    rut = rut + `-${module}`;
    return rut;
  }
}
