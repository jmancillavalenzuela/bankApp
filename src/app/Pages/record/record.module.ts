import { NgModule } from '@angular/core';
import { RecordRoutingModule } from './record-routing.module';
import { RecordComponent } from './record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RecordRoutingModule,
    NzDividerModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzButtonModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RecordComponent],
  exports: [RecordComponent],
})
export class RecordModule {}
