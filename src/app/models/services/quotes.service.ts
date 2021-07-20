import { Quote } from './../Quote';
import { ModalComponent } from './../../components/modal/modal.component';
import { MyquotesComponent } from './../../components/myquotes/myquotes.component';
// import { ModalComponent } from './../components/modal/modal.component';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

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

  isLoggedIn = false;

  myFavQuotes = false;
  constructor(
    public afs: AngularFirestore,
    private dialog: MatDialog,
    public firebaseAuth: AngularFireAuth
  ) {
    this.quoteCollection = this.afs.collection('quotes', (ref) =>
      ref.orderBy('quote', 'asc')
    );
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

  async sighin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async sighup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getQuotes() {
    // console.log(this.quotes)
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

  favQuote(quote: Quote) {
    // this.quoteCollection.update(quote.fav);
    this.quoteDoc = this.afs.doc(`quotes/${quote.fav}`);
    // DatabaseRef.ref('users/' + myuser.uid).update(updated_user_info)
    // if( (this.quoteDoc)){

    // }
    console.log("here", quote.fav)
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
