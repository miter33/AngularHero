import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Login, LoginFail, LoginSuccess } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account-repository.service';
import { AuthActionTypes } from './auth.actions';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private route: Router
  ) {}

  @Effect()
  public login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    switchMap((action: Login) =>
      this.accountService.login(action.email, action.password).pipe(
        map((user: User) => {
          this.route.navigate(['']);
          return new LoginSuccess(user);
        }),
        catchError((error: any) => of(new LoginFail(error)))
      )
    )
  );
}
