import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/budget';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Statistics } from 'src/app/statistics';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }
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

  filter(){
    //this.call();
    //this.router.navigate(['functions/diagrams/'+this.rangeDate.dateFrom+'/'+this.rangeDate.dateTo]);
    //this.router.navigate(['functions/diagrams'], { queryParams: { dateFrom: this.rangeDate.dateFrom, dateTo: this.rangeDate.dateTo } })
    this.redirectTo('functions/diagrams/'+this.rangeDate.dateFrom+'/'+this.rangeDate.dateTo);
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
  // options
  view: [number, number]= [1200, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Okres';
  yAxisLabel: string = 'PLN';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  chart: Array<{ name :string, series :Array<{name:string, value:number}>}> = [];

  ngOnInit(): void {
    var dateFromParam = this.activatedRoute.snapshot.paramMap.get('dateFrom');
    var dateToParam = this.activatedRoute.snapshot.paramMap.get('dateTo');
    if (dateFromParam != null && dateToParam!=null){
      this.rangeDate.dateFrom = dateFromParam;
      this.rangeDate.dateTo = dateToParam;
      this.firstFormGroup = this._formBuilder.group({
        ctrlDateFrom: [dateFromParam, Validators.required],
        ctrlDateTo: [dateToParam, Validators.required]
      });
    } else {
      var dateFrom = new Date();
      var dateTo = new Date();
      dateFrom.setFullYear(dateFrom.getFullYear()-1);
      this.rangeDate.dateFrom = dateFrom.toISOString().substring(0,10);
      this.firstFormGroup = this._formBuilder.group({
        ctrlDateFrom: [dateFrom.toISOString().substring(0,10), Validators.required],
        ctrlDateTo: [dateTo.toISOString().substring(0,10), Validators.required]
      });
    }
    this.call();
    this.now();
  }

  call(){
    
    this.http.get(this.BaseURI + '/functions/get-budgetStatistics?dateFrom='+this.rangeDate.dateFrom+'&dateTo='+this.rangeDate.dateTo) 
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
        this.chart.push({ name: "Rezultat", series: budgetSaveList});
        this.chart = [...this.chart];
        console.log(this.chart);
      }
    }); 
  }
}
