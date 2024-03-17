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
  constructor(private userService: UserService, private router: Router) {}
  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { username, email, password, rePassword } = form.value;
    console.log(username, email, password);
    if (password !== rePassword) {
      return;
    }
    this.userService.register(username, email, password).subscribe((x) => {
      this.userService.user = x;
      localStorage.setItem('user', JSON.stringify(x));
      this.router.navigate(['/home']);
    });
  }
}
