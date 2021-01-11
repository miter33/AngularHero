import { ActionReducerMap } from '@ngrx/store';
import { AuthEffect } from './auth/auth.effects';
import { authReducer, AuthState } from './auth/auth.reducer';
import { heroReducer } from './hero/hero.reducer';
import { HeroEffect } from './hero/hero.effects';
import { HeroState } from './hero/hero.state';
import { RouterEffect } from './router/router.effects';

export const effects = [AuthEffect, HeroEffect, RouterEffect];

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  heroes: heroReducer
};

export interface AppState {
  auth: AuthState;
  heroes: HeroState;
}
