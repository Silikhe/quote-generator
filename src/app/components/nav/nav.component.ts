import { QuotesService } from './../../models/services/quotes.service';
import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
// import * as EventEmitter from 'events';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  navbarfixed: boolean = false;
  @Output() isLogout = new EventEmitter()
  constructor(public firebaseService: QuotesService) {}

  ngOnInit(): void {

  }

  logOut(){
    this.firebaseService.logout()
    this.isLogout.emit
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 250) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}
