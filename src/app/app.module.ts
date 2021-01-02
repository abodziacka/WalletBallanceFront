import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';  

import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { FunctionsComponent } from './functions/functions.component';
import { AddBillComponent } from './functions/add-bill/add-bill.component';
import { MyBillsComponent } from './functions/my-bills/my-bills.component';
import { DiagramsComponent } from './functions/diagrams/diagrams.component';
import { BudgetComponent } from './functions/budget/budget.component';
import { MyAccountComponent } from './functions/my-account/my-account.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BillDetailComponent } from './functions/my-bills/bill-detail/bill-detail.component';
import { EditBillComponent } from './functions/my-bills/edit-bill/edit-bill.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    FunctionsComponent,
    AddBillComponent,
    MyBillsComponent,
    DiagramsComponent,
    BudgetComponent,
    MyAccountComponent,
    BillDetailComponent,
    EditBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    FormsModule,
    CommonModule,
    NgbModule
    
  ],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
