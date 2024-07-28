import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DialogModule } from 'primeng/dialog';
import { PipeDirectiveModule } from "../pipe/pipe.module";

const routes: Routes = [
  { path: '', component: CustomersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    PipeDirectiveModule
],
  declarations: [CustomersComponent]
})
export class CustomerModule { }

