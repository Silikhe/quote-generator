import { Quote } from './../models/Quote';
import { from, Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
// import { AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quoteCollection: AngularFirestoreCollection<Quote>;
  quotes: Observable<any>;
quoteDoc: AngularFirestoreDocument<any>

  constructor(public afs: AngularFirestore) {
    this.quoteCollection = this.afs.collection('quotes')
    this.quotes = this.afs.collection('quotes').valueChanges();
    // this.quotes = this.afs.collection('quotes').snapshotChanges().map(changes => {
    //   return changes.map((a) => {
    //     const data = a.payload.doc.data() as Quote;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   })
    // })
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

  deleteQuote(quote: Quote){
    this.quoteDoc = this.afs.doc(`quotes/${quote.id}`);
    this.quoteDoc.delete()
  }


}
