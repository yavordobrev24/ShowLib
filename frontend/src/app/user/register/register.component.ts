import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {}
  register(form: NgForm) {
    if (form.invalid) {
      this.error = 'Email and password required!';
      return;
    }
    const { username, email, password, rePassword } = form.value;
    if (password !== rePassword) {
      this.error = 'Passwords mismatch!';
      return;
    }

    this.userService.register(username, email, password).subscribe(
      (x: any) => {
        this.userService.user = x;
        localStorage.setItem('user', JSON.stringify(x));
        this.apiService.createLibrary().subscribe((p: any) => {
          const userLibrary = p;
          localStorage.setItem('library', JSON.stringify(userLibrary));
        });
        this.router.navigate(['/home']);
      },
      (e) => {
        this.error = 'Account with this email already exists!';
        return;
      }
    );
  }
}
