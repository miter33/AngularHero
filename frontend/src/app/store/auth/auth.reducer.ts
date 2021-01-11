import { Actions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  email: string;
  userName: string;
  error: string;
}

export const initialState: AuthState = {
  email: null,
  userName: null,
  error: null,
};

export function authReducer(state = initialState, action: Actions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        email: action.user.email,
        userName: action.user.userName,
      };
    case AuthActionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.RESET_AUTH:
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
        error: null,
      };
  }
}
