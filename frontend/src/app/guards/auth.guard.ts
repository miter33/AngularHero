import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private route: Router) {}

  canActivate(): boolean {
    if (!this.accountService.IsAuthenticated()) {
      this.route.navigate(['login']);
    }
    return true;
  }
}
