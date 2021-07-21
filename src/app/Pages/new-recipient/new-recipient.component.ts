import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BankResponse } from '../../Services/DTO/bank.dto';
import { BankService } from '../../Services/bank.service';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.less'],
})
export class NewRecipientComponent implements OnInit {
  newRecipientForm!: FormGroup;
  bankList: BankResponse[] = [];
  accountTypeList: string[] = [];
  isLoading = false;

  submitForm(): void {
    for (const i in this.newRecipientForm.controls) {
      if (this.newRecipientForm.controls.hasOwnProperty(i)) {
        this.newRecipientForm.controls[i].markAsDirty();
        this.newRecipientForm.controls[i].updateValueAndValidity();
      }
    }
    const makeReceiverAccount = this.newRecipientForm.value;
    console.log(makeReceiverAccount);
  }

  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    //Init Form
    this.newRecipientForm = this.fb.group({
      fullName: [null, [Validators.required]],
      rut: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumberPrefix: ['+56'],
      phoneNumber: [
        null,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      destinationBank: ['0000001', [Validators.required]],
      accountType: ['Cuenta Corriente', [Validators.required]],
      accountNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
    });
    //Init Banks Select
    try {
      this.bankList = (await this.bankService.getBanks().toPromise()).banks;
    } catch {
      this.messageService.add('Error in Bank Service');
    }
    //Init Banks Account Type
    try {
      this.accountTypeList = ['Cuenta Vista', 'Cuenta Corriente'];
    } catch {
      this.messageService.add('Error in Bank Service');
    }
  }

  /*   public formatRut(): void {
    let rut = this.formNuevoDestinatario.get('rut_dest')!.value.toString();
    rut = rut.replace('.', '').replace('-', '');
    const module = rut.substr(rut.length - 1);
    rut = rut.slice(0, -1);
    rut = rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    rut = rut + `-${module}`;
    this.formNuevoDestinatario.get('rut_dest')!.setValue(rut);
  } */
}
