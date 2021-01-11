import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Statistics } from 'src/app/statistics';
import { DiagramDetails } from 'src/app/diagramDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagramCatDetails } from 'src/app/diagramCatDetails';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, AfterViewInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }
  readonly BaseURI='http://localhost:55284';

  liDiagCatDetails:any; 
  lisDiagCatDetails: Array<DiagramCatDetails> = []; 
  diagramCatDetail= new DiagramCatDetails();

  displayedColumns: string[] = ['name', 'amount', 'totalPrice'];
  dataSource = new MatTableDataSource<DiagramCatDetails>(this.lisDiagCatDetails);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Ilość na stronie";
    setTimeout(() => this.dataSource.paginator = this.paginator);
    console.log(this.dataSource);
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    var categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');

    if (categoryId != null && id != null){
      this.service.getDiagramCatDetails(id, categoryId) 
      .subscribe(Response => { 
    
        // If response comes hideloader() function is called 
        // to hide that loader  
        
        console.log(Response) 
        this.liDiagCatDetails=Response; 
        this.lisDiagCatDetails=this.liDiagCatDetails; 
        this.dataSource = new MatTableDataSource<DiagramCatDetails>(this.lisDiagCatDetails);

        console.log(this.lisDiagCatDetails);
      }); 
    }
  }
}
