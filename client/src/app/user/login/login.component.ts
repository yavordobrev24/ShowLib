import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: any;
  constructor(private userService: UserService, private router: Router) {}
  login(form: NgForm) {
    if (form.invalid) {
      this.error = 'Email and password required!';
      return;
    }
    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(
      (x: any) => {
        this.userService.user = x;
        localStorage.setItem('user', JSON.stringify(x));
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = "Login or password don't match!";
        return;
      }
    );
  }
}
