import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronComponent } from './cron/cron.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    CronComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    CronComponent
  ]
})
export class CronModule { }
