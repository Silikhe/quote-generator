import { Quote } from './../Quote';
import { ModalComponent } from './../../components/modal/modal.component';
import { MyquotesComponent } from './../../components/myquotes/myquotes.component';
// import { ModalComponent } from './../components/modal/modal.component';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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

  animal: string;
  name: string;

  constructor(public afs: AngularFirestore, private dialog: MatDialog) {
    this.quoteCollection = this.afs.collection('quotes');
    // this.quotes = this.afs.collection('quotes').valueChanges();
    this.quotes = this.afs
      .collection('quotes')
      .snapshotChanges()
      .pipe(
        map((change: any) => {
          return change.map((a: any) => {
            const data = a.payload.doc.data() as Quote;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  deleteQuote(quote: Quote) {
    this.quoteDoc = this.afs.doc(`quotes/${quote.id}`);
    this.quoteDoc.delete();
    // console.log(quote.id)
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(MyquotesComponent, dialogConfig);
  }

  castVote(quote: Quote) {
    // this.quoteCollection.add(quote.vote);
  }
}
