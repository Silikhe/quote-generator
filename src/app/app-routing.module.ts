import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { ButtonComponent } from './components/button/button.component';
import { AllquotesComponent } from './components/allquotes/allquotes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-quotes', component: AllquotesComponent },
  { path: 'favourite', component: FavouriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AllquotesComponent, ButtonComponent]
