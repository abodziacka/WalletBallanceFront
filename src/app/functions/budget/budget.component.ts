import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Budget } from 'src/app/budget';
import { element } from 'protractor';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router) { }

  readonly BaseURI='http://localhost:55284';

  firstFormGroup!: FormGroup;

  li:any; 
  lis: Array<Budget> = []; 
  budget=new Budget();
  submitted = false;

  quantity: number = 0;
  fromDate: string =new Date().toDateString();
  toDate: string =new Date().toDateString();

  addNewBudget(){
    if (this.budget.fromDate != null && this.budget.toDate != null){
      this.service.getCountBudgetInPeriod(this.budget.fromDate!, this.budget.toDate!).subscribe(Res => { 
        if (Res==0){
          this.budget.quantity= Number(this.budget.quantity);
          this.service.addBudget(this.budget).subscribe(
            (res: any) => {
              this.ngOnInit();
            },
            err => {
                console.log(err);
            }
          );;
        } else {
          
        }
      }); 
    }
  }

  delete(id?:number){
    if (id!=undefined){
      this.service.deleteBudget(id).subscribe(
        (res: any) => {
          this.ngOnInit();
          console.log(id);

        },
        err => {
            console.log(err);
        }
      );
      this.lis.splice(id,1);
    }

    
  }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrlQuantity: ['', Validators.required],
      firstCtrlFromDate: ['', Validators.required],
      firstCtrlToDate: ['', Validators.required]

    });

    this.http.get(this.BaseURI + '/functions/get-budgets') 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      
      console.log(Response) 
      this.li=Response; 
      this.lis=this.li; 
      console.log(this.lis);
    }); 
  }
  onSubmit() {
    this.submitted = true;
  }
  
}

