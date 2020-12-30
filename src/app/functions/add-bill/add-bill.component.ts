import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit { 

  firstFormGroup: FormGroup;
  Products: Array<Product> = [];
  index: number = 1;
  model = new Product(this.index, '', '',0,0);
  submitted = false;
  constructor(private _formBuilder: FormBuilder) { }

  add() {
    this.Products.push(this.model);
    console.log(this.model);
  }

  delete(){
    this.Products.splice(this.index,1);
  }

  newProduct() {
      this.add();
      this.index = this.index + 1;
      this.model = new Product(this.index, '', '',0,0);

    console.log(this.Products);
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

}
