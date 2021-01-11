import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router) { }

  readonly BaseURI='http://localhost:55284';

  firstFormGroup!: FormGroup;

  li:any; 
  lis: Array<Category> = []; 
  category=new Category("");
  submitted = false;

  categoryName: string ='';
  categoryDescription: string ='';

  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<Category>(this.lis);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Ilość na stronie";
    setTimeout(() => this.dataSource.paginator = this.paginator);
    console.log(this.dataSource);
  }

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
      this.dataSource = new MatTableDataSource<Category>(this.lis);

      console.log(this.lis);
    }); 
  }

}
