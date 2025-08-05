import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { DetailsComponent } from './details/details';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'movie/:id', component: DetailsComponent },
  { path: '**', redirectTo: '' }
];
