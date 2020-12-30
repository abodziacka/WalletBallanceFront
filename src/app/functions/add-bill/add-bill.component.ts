import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bill } from 'src/app/bill';
import { Product } from 'src/app/product';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit { 

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  Products: Array<Product> = [];
  Bills: Array<Bill> = [];
  index: number = 1;
  model = new Product('', '');
  submitted = false;
  date: Date =new Date();
  shop: string ='';
  city: string = '';

  bill = new Bill('','',this.date,this.Products);

  jsonString!: string;


  constructor(private _formBuilder: FormBuilder, private service: UserService, private router: Router) { }

 

  add() {
    this.Products.push(this.model);
    console.log(this.model);
  }
  newProduct() {
    this.add();
    this.index = this.index + 1;
    this.model = new Product('', '');
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
    //this.Products=[];
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
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
  }

  // submitBill(){

  //   this.jsonString=JSON.stringify({userId: id, Name: this.title, Members: this.names, Relations: this.relations});

  //   this.newTree.sendTree(this.jsonString).pipe(first()).subscribe(
  //     data => {
  //       console.log(data);
  //     },
  //     err => {
  //     });
  // }

}
