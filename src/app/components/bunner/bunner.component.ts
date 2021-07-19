import { QuotesService } from './../../services/quotes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bunner',
  templateUrl: './bunner.component.html',
  styleUrls: ['./bunner.component.css'],
  providers:[QuotesService]

})
export class BunnerComponent implements OnInit {

  constructor(private buttonService:QuotesService) { 
  }

  onCreate(){
    this.buttonService.onCreate()
  }


  ngOnInit(): void {
  }

}
