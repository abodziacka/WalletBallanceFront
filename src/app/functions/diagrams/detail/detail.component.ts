import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Statistics } from 'src/app/statistics';
import { DiagramDetails } from 'src/app/diagramDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';




@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }
  readonly BaseURI='http://localhost:55284';

  liDiagDetails:any; 
  lisDiagDetails: Array<DiagramDetails> = []; 
  diagramDetail= new DiagramDetails();
  budgetId= "";
  
  displayedColumns: string[] = ['name', 'totalPrice', 'functions'];
  dataSource = new MatTableDataSource<DiagramDetails>(this.lisDiagDetails);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Ilość na stronie";
    setTimeout(() => this.dataSource.paginator = this.paginator);
    console.log(this.dataSource);
  }
  
  //WYKRES
  view: [number, number] = [450, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
 

  chart: Array<{ name :string, value :number}> = [];
  
 // Observable for update 
update$: Subject<any> = new Subject();
// Update function
updateChart(){
  this.update$.next(true);
}


  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null){
      this.budgetId = id;
      this.service.getDiagramDetails(id) 
      .subscribe(Response => { 
     
        
        console.log(Response) 
        this.liDiagDetails=Response; 
        this.lisDiagDetails=this.liDiagDetails; 
      this.dataSource = new MatTableDataSource<DiagramDetails>(this.lisDiagDetails);

        console.log(this.lisDiagDetails);

        let item = 0;

        if (this.chart) {
          while(item < Response.length){

            let chartItem : { name :string, value :number} = {
              'name' : Response[item].name,
              'value': Response[item].totalPrice
            };

            this.chart.push(chartItem);
            item ++;
          }
          this.chart = [...this.chart];
          console.log(this.chart);
        }
      }); 
    }
    this.updateChart()
    //this.getChartProducts();
  }

}
