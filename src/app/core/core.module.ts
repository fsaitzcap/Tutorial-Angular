import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [HeaderComponent, DialogConfirmationComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule, 
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }