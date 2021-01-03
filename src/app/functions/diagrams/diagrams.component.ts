import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/budget';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Statistics } from 'src/app/statistics';


@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router) { }
  active = 1;
  readonly BaseURI='http://localhost:55284';

  liStatistic:any; 
  lisStatistic: Array<Statistics> = []; 
  statistic=new Statistics();
  
  ngOnInit(): void {
    this.http.get(this.BaseURI + '/functions/get-budgetStatistics') 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      
      console.log(Response) 
      this.liStatistic=Response; 
      this.lisStatistic=this.liStatistic; 
      console.log(this.lisStatistic);
    }); 
  }
}
