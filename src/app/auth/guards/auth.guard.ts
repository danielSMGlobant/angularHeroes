import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate([`./auth/login`]);
          console.log("BLOQUEADO POR AUTHGUARD - CANACTIVATE");
        }
      })
    );

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log("BLOQUEADO POR AUTHGUARD - CANACTIVATE");
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate([`./auth/login`]);
          console.log("BLOQUEADO POR AUTHGUARD - CANLOAD");
        }
      })
    );
    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log("BLOQUEADO POR AUTHGUARD - CANLOAD");
    // return false;
  }
}
