import { Component, OnInit } from '@angular/core';
import { QuotesService } from './../../models/services/quotes.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isSighedIn = false;

  constructor(public firebaseService: QuotesService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSighedIn = true;
    } else {
      this.isSighedIn = false;
    }
  }

  async onSignup(email: string, password: string) {
    await this.firebaseService.sighup(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSighedIn = true;
    }
  }


  async onLogin(email: string, password: string) {
    await this.firebaseService.sighup(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSighedIn = true;
    }
  }

  handleLogOut(){
    this.isSighedIn=false
  }
}
