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
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   return this.authService.verificaAutenticacion().pipe(
  //     tap((isAuth) => {
  //       if (!isAuth) {
  //         this.router.navigate([`./auth/login`]);
  //         console.log("BLOQUEADO POR AUTHGUARD - CANACTIVATE");
  //       }
  //     })
  //   );
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.verificaAutenticacion().pipe(
      map((isAuth) => isAuth || this.router.createUrlTree(['./auth/login']))
    );
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
