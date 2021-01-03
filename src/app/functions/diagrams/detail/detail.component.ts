import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Statistics } from 'src/app/statistics';
import { DiagramDetails } from 'src/app/diagramDetails';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private http:HttpClient, private _formBuilder: FormBuilder,  private service: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }
  readonly BaseURI='http://localhost:55284';

  liDiagDetails:any; 
  lisDiagDetails: Array<DiagramDetails> = []; 
  diagramDetail= new DiagramDetails();
  budgetId= "";
  
  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null){
      this.budgetId = id;
      this.service.getDiagramDetails(id) 
      .subscribe(Response => { 
    
        // If response comes hideloader() function is called 
        // to hide that loader  
        
        console.log(Response) 
        this.liDiagDetails=Response; 
        this.lisDiagDetails=this.liDiagDetails; 
        console.log(this.lisDiagDetails);
      }); 
    }
  }

}
