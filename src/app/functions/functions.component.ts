import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  readonly BaseURI='http://localhost:55284';

  ngOnInit(): void {
  }

  getBills(){
    return this.http.get(this.BaseURI + '/functions/get-bills');
  }
}
