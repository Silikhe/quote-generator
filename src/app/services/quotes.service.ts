import { Quote } from './../models/Quote';
import { from, Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
// import { AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})

export class QuotesService {
   itemsCollection: AngularFirestoreCollection<Quote>;
  quotes: Observable<any>;
  constructor(public afs: AngularFirestore) {
    this.quotes = this.afs.collection('quotes').valueChanges()
  }


  getQuotes(){
    return this.quotes;
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
}


