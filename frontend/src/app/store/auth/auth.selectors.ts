import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const errorLogin = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.error
);
