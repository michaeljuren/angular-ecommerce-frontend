import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthPathGuardService {

  constructor( public authService: AuthService,
               public router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
              : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
      return this.authService.isAuthenticated$.pipe(
        map(isLoggedIn => {
          if(!isLoggedIn){
            return this.router.parseUrl('/401')
          }
          return true;
        })
      )
    }
}
