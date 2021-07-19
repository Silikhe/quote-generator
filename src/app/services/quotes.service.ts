import { Quote } from './../models/Quote';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { MyquotesComponent } from '../components/myquotes/myquotes.component';

// import { AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quoteCollection: AngularFirestoreCollection<Quote>;
  quotes: Observable<any>;
  quoteDoc: AngularFirestoreDocument<any>;
  // getVotes(quoteId): Observable<any>{
    
  // }

  constructor(public afs: AngularFirestore, private dialog: MatDialog) {
    this.quoteCollection = this.afs.collection('quotes');
    // this.quotes = this.afs.collection('quotes').valueChanges();
    this.quotes = this.afs.collection('quotes').snapshotChanges().pipe(map( (change: any) => {
      return change.map((a: any) => {
        const data = a.payload.doc.data() as Quote;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getQuotes() {
    return this.quotes;
  }

  addQuote(quote: Quote) {
    this.quoteCollection.add(quote);
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    credit: new FormControl('', Validators.required),
    quote: new FormControl('', Validators.required),
    imgUrl: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      quote: '',
      credit: '',
    });
  }

  deleteQuote(quote: Quote) {
    this.quoteDoc = this.afs.doc(`quotes/${quote.id}`);
    this.quoteDoc.delete();
    // console.log(quote.id)
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"; 
   this.dialog.open(MyquotesComponent, dialogConfig)
  }

  castVote(quote: Quote){
    // this.quoteCollection.add(quote.vote);

  }
}
