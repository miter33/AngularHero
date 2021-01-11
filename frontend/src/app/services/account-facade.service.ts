import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Login, ResetAuth } from '../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { ResetHero } from '../store/hero/hero.actions';
import { AccountService } from './account-repository.service';
import { errorLogin } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AccountFacadeService {
  constructor(
    private store: Store<AppState>,
    private accountService: AccountService
  ) {}

  public login(email: string, password: string): void {
    this.store.dispatch(new Login(email, password));
  }

  public logout(): void {
    this.store.dispatch(new ResetHero());
    this.store.dispatch(new ResetAuth());
    this.accountService.logout();
  }

  public get errorLogin$(): Observable<any> {
    return this.store.select(errorLogin);
  }
}
