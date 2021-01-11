import { Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN SUCCESS',
  LOGIN_FAIL = 'LOGIN FAIL',
  RESET_AUTH = 'RESET AUTH',
}

export class Login implements Action {
  public readonly type = AuthActionTypes.LOGIN;

  constructor(public email: string, public password: string) {}
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LOGIN_SUCCESS;
  private readonly nameToken: string = environment.nameToken;
  constructor(public user: User) {
    if (user.accessToken) {
      localStorage.setItem(this.nameToken, user.accessToken);
    }
  }
}

export class LoginFail implements Action {
  public readonly type = AuthActionTypes.LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class ResetAuth implements Action {
  public readonly type = AuthActionTypes.RESET_AUTH;
}

export type Actions = Login | LoginSuccess | LoginFail | ResetAuth;
