import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { MatTooltipModule } from '@angular/material/tooltip';
import { UserModule } from './user/user.module';
import { DetailsComponent } from './details/details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';
import { MatButtonModule } from '@angular/material/button';
import { DiscoverComponent } from './discover/discover.component';
import { SearchComponent } from './search/search.component';
import { MatChipsModule } from '@angular/material/chips';
import { PopularComponent } from './popular/popular.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PopularComponent,
    DiscoverComponent,
    DetailsComponent,
    SafePipe,
    SearchComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    UserModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    MatChipsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
