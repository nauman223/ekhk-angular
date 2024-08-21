import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HeaderComponent } from './header.component';



@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
})
export class HeaderModule { }

