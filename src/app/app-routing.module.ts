import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { FunctionsComponent } from './functions/functions.component';
import { AddBillComponent } from './functions/add-bill/add-bill.component';
import { MyBillsComponent } from './functions/my-bills/my-bills.component';
import { DiagramsComponent } from './functions/diagrams/diagrams.component';
import { BudgetComponent } from './functions/budget/budget.component';
import { MyAccountComponent } from './functions/my-account/my-account.component';
import { AuthGuard } from './auth/auth.guard';
import { BillDetailComponent } from './functions/my-bills/bill-detail/bill-detail.component';
import { EditBillComponent } from './functions/my-bills/edit-bill/edit-bill.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/user/registration', pathMatch: 'full' },
  {
      path: 'user', component: UserComponent,
        children: [
        { path: 'registration', component: RegistrationComponent },
        { path: 'login', component: LoginComponent }]
  },
  {
    path: 'functions', component: FunctionsComponent, 
      children: [
      { path: 'my-bills/bill-detail/:id', component: BillDetailComponent,canActivate: [AuthGuard] },
      { path: 'my-bills/edit-bill/:id', component: EditBillComponent ,canActivate: [AuthGuard] },
      { path: 'my-bills', component: MyBillsComponent, canActivate: [AuthGuard] ,
        children:[
          {path: 'bill-detail', component: BillDetailComponent, canActivate: [AuthGuard]}
            ]},
      { path: 'add-bill', component: AddBillComponent,canActivate: [AuthGuard] },
      { path: 'diagrams', component: DiagramsComponent,canActivate: [AuthGuard] },
      { path: 'budget', component: BudgetComponent,canActivate: [AuthGuard] },
      { path: 'my-account', component: MyAccountComponent,canActivate: [AuthGuard]}]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling:'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
