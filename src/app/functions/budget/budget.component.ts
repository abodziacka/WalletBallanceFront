import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Budget } from 'src/app/budget';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, AfterViewInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router,  private modalService: NgbModal, public toastr:ToastrService) { }

  readonly BaseURI='http://localhost:55284';
  closeResult = '';
  firstFormGroup: any;

  li:any; 
  lis: Array<Budget> = []; 
  budget=new Budget();
  submitted = false;

  quantity: number = 0;
  fromDate: string =new Date().toDateString();
  toDate: string =new Date().toDateString();

  displayedColumns: string[] = ['fromDate', 'toDate','quantity', 'functions'];
  dataSource = new MatTableDataSource<Budget>(this.lis);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Ilość na stronie";
    setTimeout(() => this.dataSource.paginator = this.paginator);
    console.log(this.dataSource);
  }

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
          this.toastr.error( 'Podana data znajduje się już w okresach budżetowych.','Niepoprawny okres budżetowy.');
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
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrlQuantity: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]*.?[0-9]+$')]],
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
      this.dataSource = new MatTableDataSource<Budget>(this.lis);
      console.log(this.lis);
    }); 
  }
  onSubmit() {
    this.submitted = true;
  }
  
}

