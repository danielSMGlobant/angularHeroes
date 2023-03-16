import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, of, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { Auth } from "../interfaces/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) {}

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((res) => {
        this._auth = res;
      }),
      tap((res) => {
        localStorage.setItem("token", res.id);
      })
    );
  }

  get auth(): Auth {
    return { ...this._auth! };
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem("token");
  }

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem("token")) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }
}
