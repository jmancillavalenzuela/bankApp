import { NgModule } from '@angular/core';
import { NewRecipientRoutingModule } from './new-recipient-routing.module';
import { NewRecipientComponent } from './new-recipient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NewRecipientRoutingModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NewRecipientComponent],
  exports: [NewRecipientComponent],
})
export class NewRecipientModule {}
