import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LibraryComponent } from './library/library.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LibraryComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
