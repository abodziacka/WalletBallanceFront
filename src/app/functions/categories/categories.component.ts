import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router) { }

  readonly BaseURI='http://localhost:55284';

  firstFormGroup!: FormGroup;

  li:any; 
  lis: Array<Category> = []; 
  category=new Category("");
  submitted = false;

  categoryName: string ='';
  categoryDescription: string ='';

  addNewCategory(){

    this.service.addCategory(this.category).subscribe(
      (res: any) => {
        this.ngOnInit();
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

    this.firstFormGroup = this._formBuilder.group({
      firstCtrlName: ['', Validators.required],
      firstCtrlDesc: ['', Validators.required]
    });

    this.http.get(this.BaseURI + '/functions/get-category') 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      
      console.log(Response) 
      this.li=Response; 
      this.lis=this.li; 
      console.log(this.lis);
    }); 
  }

}
