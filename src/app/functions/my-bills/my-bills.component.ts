import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { Bill } from 'src/app/bill';


@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent implements OnInit {

  readonly BaseURI='http://localhost:55284';
  li:any; 
  lis: Bill[] = []; 

  public data = [];
  public noData: any;
  public results = [];

  constructor(private service: UserService,private http:HttpClient) { }


  ngOnInit(): void {
    this.http.get(this.BaseURI + '/functions/get-bills') 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      
      console.log(Response) 
      this.li=Response; 
      this.lis=this.li; 
    }); 
   
  }

  // getAll(){
  //   this.service.getBills().subscribe((results)=>{
  //     this.data=results.bills;
  //     console.log('JSON Response = ', JSON.stringify(results));
  //   })
  // }

}
