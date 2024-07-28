import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
    declarations:[LoginComponent],
    imports: [
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    ],
    exports: [RouterModule]
})
export class AuthModule { }
