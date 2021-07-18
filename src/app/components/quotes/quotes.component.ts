import { QuotesService } from './../../services/quotes.service';
import { Component, OnInit } from '@angular/core';
import { Quote } from './../../models/Quote';
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class MyquotesComponent implements OnInit {

  quotes: Quote[];

  constructor(public service: QuotesService) { }

  ngOnInit(): void {
    console.log("Run")
    this.service.getQuotes().subscribe(quotes => {
      console.log(quotes)
      this.quotes = quotes;
    })
  }



}
