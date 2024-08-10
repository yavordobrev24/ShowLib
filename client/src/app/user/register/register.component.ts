import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: any;
  constructor(private userService: UserService, private router: Router) {}
  register(form: NgForm) {
    if (form.invalid) {
      this.error = 'All fields required!';
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
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = 'Account with this email already exists!';
        return;
      }
    );
  }
}
