import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Hero } from 'src/app/models/hero';

export interface HeroState extends EntityState<Hero> {
  selectedHeroId: number | null;
  selectedHeroByName: Hero[];
  isLoaded: boolean;
  error: string;
}

export const heroAdapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const defaultHero: HeroState = {
  ids: [],
  entities: {},
  selectedHeroId: null,
  selectedHeroByName: [],
  isLoaded: false,
  error: '',
};

export const initialState = heroAdapter.getInitialState(defaultHero);
