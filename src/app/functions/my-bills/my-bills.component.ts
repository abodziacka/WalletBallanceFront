import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { Bill } from 'src/app/bill';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent implements OnInit, AfterViewInit {

  li:any; 
  lis: Bill[] = []; 
  displayedColumns: string[] = ['date', 'shop', 'city', 'functions'];
  dataSource = new MatTableDataSource<Bill>(this.lis);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Ilość na stronie";
    setTimeout(() => this.dataSource.paginator = this.paginator);
    console.log(this.dataSource);
  }

  readonly BaseURI='http://localhost:55284';


  public data = [];
  public noData: any;
  public results = [];

  constructor(private service: UserService,private http:HttpClient, private modalService: NgbModal,private router: Router) { }
  closeResult = '';
  
  ngOnInit(): void {
    this.http.get(this.BaseURI + '/functions/get-bills') 
    .subscribe(Response => { 
      this.li=Response; 
      this.lis=this.li; 
      
      this.dataSource = new MatTableDataSource<Bill>(this.li);
      console.log(this.lis) 

    }); 
   
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete(id?:number){
    if (id!=undefined){
      this.service.deleteBill(id).subscribe(
        (res: any) => {
          this.ngOnInit();
        },
        err => {
            console.log(err);
        }
      );
      this.lis.splice(id,1);
    }

    
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

}

