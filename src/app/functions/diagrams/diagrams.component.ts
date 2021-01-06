import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/budget';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Statistics } from 'src/app/statistics';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router) { }
  active = 1;
  readonly BaseURI='http://localhost:55284';

  
  

  firstFormGroup!: FormGroup;
  submitted = false;


  liStatistic:any; 
  lisStatistic: Array<Statistics> = []; 
  statistic=new Statistics();
  
  rangeDate: {dateFrom: string, dateTo: string} = { dateFrom: new Date().toISOString().substring(0,10), dateTo: new Date().toISOString().substring(0,10)};


  onSubmit() {
    this.submitted = true;
  }
  now(){
    var nowDate =new Date().toDateString();
    console.log(nowDate);
  }
  
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Money';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  chart: Array<{ name :string, series :Array<{name:string, value:number}>}> = [];

  ngOnInit(): void {
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setFullYear(dateFrom.getFullYear()-1);
    this.rangeDate.dateFrom = dateFrom.toISOString().substring(0,10);
    this.firstFormGroup = this._formBuilder.group({
      ctrlDateFrom: [dateFrom.toISOString().substring(0,10), Validators.required],
      ctrlDateTo: [dateTo.toISOString().substring(0,10), Validators.required]

    });

    this.http.get(this.BaseURI + '/functions/get-budgetStatistics?dateFrom='+dateFrom.toISOString().substring(0,10)+'&dateTo='+dateTo.toISOString().substring(0,10)) 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      
      console.log(Response) 
      this.liStatistic=Response; 
      this.lisStatistic=this.liStatistic; 
      console.log(this.lisStatistic);

      let item = this.liStatistic.length-1;
      let budgetList: Array<{name:string, value:number}> = [];
      let budgetSpendList: Array<{name:string, value:number}> = [];
      let budgetSaveList: Array<{name:string, value:number}> = [];
      if (this.chart) {
        while(item >=0){

          let chartItemBudget : { name :string, value :number} = {
            'name' : (this.liStatistic[item].fromDate + "").substring(0,10),
            'value': this.liStatistic[item].quantity
          };
          let chartItemSpendBudget : { name :string, value :number} = {
            'name' : (this.liStatistic[item].fromDate + "").substring(0,10),
            'value': this.liStatistic[item].price
          };
          let budgetSaveListBudget : { name :string, value :number} = {
            'name' : (this.liStatistic[item].fromDate + "").substring(0,10),
            'value': this.liStatistic[item].saveMoney
          };

          budgetList.push(chartItemBudget);
          budgetSpendList.push(chartItemSpendBudget);
          budgetSaveList.push(budgetSaveListBudget);
          item --;
        }
        this.chart.push({ name: "Budżet", series: budgetList});
        this.chart.push({ name: "Wydatki", series: budgetSpendList});
        this.chart.push({ name: "Resultat", series: budgetSaveList});
        this.chart = [...this.chart];
        console.log(this.chart);
      }
    }); 

    this.now();
  }
}
