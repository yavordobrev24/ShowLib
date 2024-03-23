import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotLoggedActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isUserLoggedIn = this.userService.isLogged;
    if (isUserLoggedIn) {
      this.router.navigate(['/home']);
    }
    return true;
  }
}
