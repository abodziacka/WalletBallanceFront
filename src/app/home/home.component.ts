import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  myimage1: string = 'assets/diagram.png';
  myimage2: string = 'assets/bill.png';
  myimage3: string = 'assets/piggy.png';



}
