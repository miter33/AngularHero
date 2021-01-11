import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly baseUrl: string = environment.apiUrl;
  private readonly nameToken: string = environment.nameToken;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private route: Router
  ) {}

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/account/login`, {
      email,
      password,
    });
  }

  public IsAuthenticated(): boolean {
    const token = localStorage.getItem(this.nameToken);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    localStorage.removeItem(this.nameToken);
    this.route.navigate(['login']);
  }
}
