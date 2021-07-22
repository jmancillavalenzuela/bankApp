import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BankService } from '../../Services/bank.service';
import { MessageService } from '../../Services/message.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http'; //ELIMINAR POR SERVICIO

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.less'],
})
export class TransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  destinationRutList: any[] = []; //TIPAR
  nzFilterOption = () => true;
  isLoading = false;

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
    private bankService: BankService,
    private messageService: MessageService,
    private message: NzMessageService,
    private httpClient: HttpClient //ELIMINAR por SERVICIO
  ) {}

  async ngOnInit(): Promise<void> {
    //Init Form
    this.transactionForm = this.fb.group({
      fullName: [null, [Validators.required]],
      rut: [null, [Validators.required]],
      amount: [null, [Validators.email, Validators.required]],
    });
    //Init Destination Rut Select Search
    try {
      this.destinationRutList = ['18793047-2'];
    } catch {
      this.messageService.add('Error in Bank Service');
    }
  }

  public saveForm(): void {
    if (this.transactionForm.status === 'VALID') {
      const makeReceiverAccount = this.transactionForm.value;
      console.log(makeReceiverAccount);
      //SAVE FORM
      this.message.success(`Transacción Realizada Exitosamente`);
      this.message.error('Hubo un problema en Realizar su Transacción');
    }
  }

  search(value: string): void {
    this.httpClient
      .jsonp<{ result: Array<[string, string]> }>(
        `https://suggest.taobao.com/sug?code=utf-8&q=${value}`,
        'callback'
      )
      .subscribe((data) => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.result.forEach((item) => {
          listOfOption.push({
            value: item[0],
            text: item[0],
          });
        });
        this.destinationRutList = listOfOption;
      });
  }
}
