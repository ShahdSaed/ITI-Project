import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { DetailsComponent } from './details/details';
import { WatchList } from './watch-list/watch-list';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'movie/:id', component: DetailsComponent },
  { path: 'watch-list', component: WatchList },
  { path: '**', redirectTo: '' }
];
