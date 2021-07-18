import { QuotesService } from './../../services/quotes.service';
import { Component, OnInit } from '@angular/core';
import { Quote } from './../../models/Quote';


@Component({
  selector: 'app-myquotes',
  templateUrl: './myquotes.component.html',
  styleUrls: ['./myquotes.component.css']
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


  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
}
