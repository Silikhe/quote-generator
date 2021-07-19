import { Quote } from './../../models/Quote';
import { QuotesService } from './../../services/quotes.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-myquotes',
  templateUrl: './myquotes.component.html',
  styleUrls: ['./myquotes.component.css'],
})
export class MyquotesComponent implements OnInit {
  quote: Quote = {
    quote: '',
    credit: '',
    imgUrl: '',
  };

  quotes: Quote[];
  constructor(public service: QuotesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Run');
    this.service.getQuotes().subscribe((quotes) => {
      console.log(quotes);
      this.quotes = quotes;
    });
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    this.service.addQuote(this.quote);
    this.onClear();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(MyquotesComponent, dialogConfig);
  }
}
