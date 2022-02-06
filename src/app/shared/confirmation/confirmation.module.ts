import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationService } from './services/confirmation.service';



@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ConfirmationComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class ConfirmationModule { }
