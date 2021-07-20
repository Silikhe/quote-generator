// import { firebase } from 'firebase/app';
import { QuotesService } from './../../models/services/quotes.service';
import { Component, OnInit } from '@angular/core';
import { Quote } from './../../models/Quote';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-myquotes',
  templateUrl: './myquotes.component.html',
  styleUrls: ['./myquotes.component.css'],
})
export class MyquotesComponent implements OnInit {
  today: number = Date.now();
  quote: Quote = {
    quote: '',
    credit: '',
    imgUrl: '',
    date: Timestamp.now()
  };

  div: boolean = false;

  quotes: Quote[];

  currentDate;
  constructor(public service: QuotesService, private dialog: MatDialog) {
    this.currentDate = new Date().toISOString().substring(0, 10);
    console.log("Heereee " + this.currentDate)
  }

  ngOnInit(): void {
    this.service.getQuotes().subscribe((quotes) => {
      console.log(quotes);
      this.quotes = quotes;
    });
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  divFunction() {
    this.div = true;
  }

  onSubmit() {
    this.service.addQuote(this.quote);
    const dialogConfig = new MatDialogConfig();
    this.divFunction();
    setTimeout(() => {
      this.dialog.closeAll();
    }, 1300);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(MyquotesComponent, dialogConfig);
  }
}
