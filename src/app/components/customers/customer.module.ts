import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DialogModule } from 'primeng/dialog';
import { PipeDirectiveModule } from "../pipe/pipe.module";
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: 'customer', component: CustomersComponent },
  { path: 'customer/:id', component: DetailComponent },
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
  declarations: [
    CustomersComponent,
    DetailComponent
  ]
})
export class CustomerModule { }

