import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  
  { 
    path: '', 
    loadChildren: () =>
    import("./components/auth/auth.module").then(
      (m) => m.AuthModule
    )
  },
  { 
    path: '', 
    loadChildren: () =>
    import("./components/customers/customer.module").then(
      (m) => m.CustomerModule
    ),
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
