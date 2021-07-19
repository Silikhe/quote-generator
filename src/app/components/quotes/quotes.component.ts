import { QuotesService } from './../../services/quotes.service';
import { Component, OnInit } from '@angular/core';
import { Quote } from './../../models/Quote';
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];

  public thumpsUp: number = 0;

  constructor(public service: QuotesService) {}

  ngOnInit(): void {
    console.log('Run');
    this.service.getQuotes().subscribe((quotes) => {
      console.log(quotes);
      this.quotes = quotes;
    });
  }

  deleteQuote(event: any, quote: Quote) {
    alert(`Are you sure you want to delete - ${quote.quote}`);
    this.service.deleteQuote(quote);
    console.log(event.target);
  }

  status: boolean = false;

  thumbUp(){
    this.thumpsUp++;
    console.log(this.thumpsUp)
    this.status = !this.status; 
          
  }

  thumbDown(){
    this.thumpsUp--;
    console.log(this.thumpsUp)
    this.status = !this.status; 
    console.log(this.status)      
  }


}
