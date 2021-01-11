import { createFeatureSelector, createSelector } from '@ngrx/store';
import { heroAdapter, HeroState } from './hero.state';

export const getHeroFeatureState = createFeatureSelector<HeroState>('heroes');

export const getHeroes = createSelector(
  getHeroFeatureState,
  heroAdapter.getSelectors().selectAll
);

export const getHeroesByName = createSelector(
  getHeroFeatureState,
  (state: HeroState) => state.selectedHeroByName
);

export const getCurrentHero = createSelector(
  getHeroFeatureState,
  (state: HeroState) => state.entities[state.selectedHeroId]
);
