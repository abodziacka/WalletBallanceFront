import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { AuthGuard } from './../auth/auth.guard';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isLoggedIn!: Observable<boolean>;

  constructor(private viewportScroller: ViewportScroller, private router: Router, private authGuard: AuthGuard) { }

  ngOnInit(): void {
    
  }

  onClickScroll(elementId: string): void{
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
