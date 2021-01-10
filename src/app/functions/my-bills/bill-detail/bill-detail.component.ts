import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from 'src/app/bill';
import { Product } from 'src/app/product';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from 'src/app/Category';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit, AfterViewInit {

  

  readonly BaseURI='http://localhost:55284';
  li:any; 
  li2:any; 
  lis: Array<Category> = []; 
 
  
  category=new Category("");

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  Products: Array<Product> = [];
  Bills: Array<Bill> = [];
  index: number = 1;
  model = new Product('');
  submitted = false;
  date: string =new Date().toDateString();
  shop: string ='';
  city: string = '';

  bill = new Bill('','',this.date,this.Products);

  jsonString!: string;

  displayedColumns: string[] = ['name', 'categoryName', 'amount', 'price', 'totalPrice'];
  dataSource = new MatTableDataSource<Product>(this.Products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Ilość na stronie";
    setTimeout(() => this.dataSource.paginator = this.paginator);
    console.log(this.dataSource);
  }



  constructor(private _formBuilder: FormBuilder, private service: UserService, private router: Router, private http:HttpClient, private activatedRoute: ActivatedRoute) { }

  getCategoryName(id?: number): Category{
    var findCategory = this.lis.find(element => element.id == id);
    if (findCategory == undefined){
      findCategory = new Category('');
    }
    return findCategory;
  }

  add() {
    this.Products.push(this.model);
    console.log(this.model);
  }
  newProduct() {
    this.add();
    this.index = this.index + 1;
    this.model = new Product('');
    console.log(this.Products);
}

  delete(){
    this.Products.splice(this.index,1);
  }


  
  newBill(){
    this.city=this.bill.city;
    this.shop=this.bill.shop;
    this.date=this.bill.date;
    this.Products=this.bill.products;
    console.log(this.bill);
    
    this.service.addBill(this.bill).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/functions/my-bills');
      },
      err => {
          console.log(err);
      }
    );;
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firstFormGroup = this._formBuilder.group({
      firstCtrlShop: ['', Validators.required],
      firstCtrlCity: ['', Validators.required],
      firstCtrlDate: [new Date(), Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrlName: ['', Validators.required],
      secondCtrlCategory: ['', Validators.required],
      secondCtrlAmount: ['', Validators.required],
      secondCtrlPrice: ['', Validators.required]
    });

    this.http.get(this.BaseURI + '/functions/get-category') 
    .subscribe(Response => { 
      
      console.log(Response) 
      this.li=Response; 
      this.lis=this.li; 
      console.log(this.lis);
      
      this.http.get(this.BaseURI + '/functions/get-bill?id='+id) 
        .subscribe(Response => { 
        
        console.log(Response) 
        this.li2=Response; 
        this.bill=this.li2;
        var dateString = (this.bill.date + "").split('T')[0];
        this.bill.date = dateString;
        this.Products=this.li2.products; 
        console.log(this.Products);
      this.dataSource = new MatTableDataSource<Product>(this.Products);

      }); 
    }); 

  }

}
