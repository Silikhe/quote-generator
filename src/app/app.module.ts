import { QuotesService } from './models/services/quotes.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { BunnerComponent } from './components/bunner/bunner.component';
import { SampleComponent } from './components/sample/sample.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyquotesComponent } from './components/myquotes/myquotes.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { DevComponent } from './components/dev/dev.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { HomeComponent } from './components/home/home.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { TimeDPipe } from './pipes/time-d.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    ButtonComponent,
    BunnerComponent,
    SampleComponent,
    QuotesComponent,
    ModalComponent,
    MyquotesComponent,
    FooterComponent,
    DevComponent,
    routingComponents,
    FavouriteComponent,
    HomeComponent,
    DateAgoPipe,
    TimeDPipe,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  providers: [QuotesService],
  bootstrap: [AppComponent],
  entryComponents: [MyquotesComponent],
})
export class AppModule {}
