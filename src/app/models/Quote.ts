// import { Timestamp } from "rxjs/internal/operators/timestamp";
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Quote {
  id?: string;
  quote: string;
  credit: string;
  imgUrl?: string;
  date: Timestamp;
  fav: boolean;
  vote: number;
  // vote:number
}
