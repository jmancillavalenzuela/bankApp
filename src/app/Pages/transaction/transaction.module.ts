import { NgModule } from '@angular/core';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzButtonModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TransactionComponent],
  exports: [TransactionComponent],
})
export class TransactionModule {}
