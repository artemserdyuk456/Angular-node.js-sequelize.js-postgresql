import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private userService: UserService,
               private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.userService.getIsAuth();
    // if (!isAuth) {
    //    this.router.navigate(['/main-page']);
    // }
    return isAuth;
  }


}
