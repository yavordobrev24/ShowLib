import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DiscoverComponent } from './discover/discover.component';
import { UserRoutingModule } from './user/user-routing.module';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'discover',
    component: DiscoverComponent,
  },
  { path: 'search', redirectTo: 'search' },
  {
    path: 'search/:searchValue',
    component: SearchComponent,
  },

  {
    path: 'details/:id',
    component: DetailsComponent,
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
