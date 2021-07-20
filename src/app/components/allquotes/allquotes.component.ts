import { QuotesService } from './../../models/services/quotes.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Quote } from './../../models/Quote';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-allquotes',
  templateUrl: './allquotes.component.html',
  styleUrls: ['./allquotes.component.css']
})
export class AllquotesComponent implements OnInit {
  quotes: Quote[];

  public thumpsUp: number = 0;

  animal: string;
  name: string;

  constructor(
    public service: QuotesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Run');
    this.service.getQuotes().subscribe((quotes) => {
      console.log("This is quotes" + quotes);
      this.quotes = quotes;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  deleteQuote(event: any, quote: Quote) {
    // this.openDialog();
    alert(`Are you sure you want to delete - ${quote.quote}`);
    this.service.deleteQuote(quote);
    console.log(event.target);
    this.openSnackBar(
      `You have deleted quote "${quote.quote} " created by ${quote.credit}`,
      `Dismis`
    );
  }

  status: boolean = false;

  thumbUp() {
    this.thumpsUp++;
    console.log(this.thumpsUp);
    this.status = !this.status;
  }

  thumbDown() {
    this.thumpsUp--;
    console.log(this.thumpsUp);
    this.status = !this.status;
    console.log(this.status);
  }
}

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
