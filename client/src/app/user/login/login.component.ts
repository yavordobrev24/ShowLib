import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Library } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: any;
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) {}
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
        this.apiService.getAllLibraries().subscribe((p: any) => {
          const userLibrary = p.find((y: Library) => y._ownerId == x._id);
          console.log(userLibrary);

          localStorage.setItem('library', JSON.stringify(userLibrary));
        });
        this.router.navigate(['/home']);
      },
      (e) => {
        this.error = "Login or password don't match!";
        return;
      }
    );
  }
}
