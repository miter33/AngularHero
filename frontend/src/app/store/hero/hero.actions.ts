import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Hero } from '../../models/hero';

export enum HeroActionTypes {
  LOAD_HEROES = 'LOAD HEROES',
  LOAD_HEROES_SUCCESS = 'LOAD HEROES SUCCESS',
  LOAD_HEROES_FAIL = 'LOAD HEROES FAIL',
  LOAD_HERO = 'LOAD HERO',
  LOAD_HERO_SUCCESS = 'LOAD HERO SUCCESS',
  LOAD_HERO_FAIL = 'LOAD HERO FAIL',
  CREATE_HERO = 'CREATE HERO',
  CREATE_HERO_SUCCESS = 'CREATE HERO SUCCESS',
  CREATE_HERO_FAIL = 'CREATE HERO FAIL',
  UPDATE_HERO = 'UPDATE HERO',
  UPDATE_HERO_SUCCESS = 'UPDATE HERO SUCCESS',
  UPDATE_HERO_FAIL = 'UPDATE HERO FAIL',
  DELETE_HERO = 'DELETE HERO',
  DELETE_HERO_SUCCESS = 'DELETE HERO SUCCESS',
  DELETE_HERO_FAIL = 'DELETE HERO FAIL',
  LOAD_HEROES_BY_NAME = 'LOAD HEROES BY NAME',
  LOAD_HEROES_BY_NAME_SUCCESS = 'LOAD HEROES BY NAME SUCCESS',
  LOAD_HEROES_BY_NAME_FAIL = 'LOAD HEROES BY NAME FAIL',
  RESET_HERO = 'RESET HERO',
}

export class LoadHeroes implements Action {
  public readonly type = HeroActionTypes.LOAD_HEROES;
}

export class LoadHeroesSuccess implements Action {
  public readonly type = HeroActionTypes.LOAD_HEROES_SUCCESS;

  constructor(public payload: Hero[]) {}
}

export class LoadHeroesFail implements Action {
  public readonly type = HeroActionTypes.LOAD_HEROES_FAIL;

  constructor(public payload: string) {}
}

export class LoadHero implements Action {
  public readonly type = HeroActionTypes.LOAD_HERO;

  constructor(public payload: number) {}

}

export class LoadHeroSuccess implements Action {
  public readonly type = HeroActionTypes.LOAD_HERO_SUCCESS;

  constructor(public payload: Hero) {}
}

export class LoadHeroFail implements Action {
  public readonly type = HeroActionTypes.LOAD_HERO_FAIL;

  constructor(public payload: string) {}
}

export class CreateHero implements Action {
  public readonly type = HeroActionTypes.CREATE_HERO;

  constructor(public payload: Hero) {}
}

export class CreateHeroSuccess implements Action {
  public readonly type = HeroActionTypes.CREATE_HERO_SUCCESS;

  constructor(public payload: Hero) {}
}

export class CreateHeroFail implements Action {
  public readonly type = HeroActionTypes.CREATE_HERO_FAIL;

  constructor(public payload: string) {}
}

export class UpdateHero implements Action {
  public readonly type = HeroActionTypes.UPDATE_HERO;

  constructor(public payload: Hero) {}
}

export class UpdateHeroSuccess implements Action {
  public readonly type = HeroActionTypes.UPDATE_HERO_SUCCESS;

  constructor(public payload: Update<Hero>) {}
}

export class UpdateHeroFail implements Action {
  public readonly type = HeroActionTypes.UPDATE_HERO_FAIL;

  constructor(public payload: string) {}
}

export class DeleteHero implements Action {
  public readonly type = HeroActionTypes.DELETE_HERO;

  constructor(public payload: number) {}
}

export class DeleteHeroSuccess implements Action {
  public readonly type = HeroActionTypes.DELETE_HERO_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteHeroFail implements Action {
  readonly type = HeroActionTypes.DELETE_HERO_FAIL;

  constructor(public payload: string) {}
}

export class LoadHeroesByName implements Action {
  readonly type = HeroActionTypes.LOAD_HEROES_BY_NAME;

  constructor(public payload: string) {}
}

export class LoadHeroesByNameSuccess implements Action {
  readonly type = HeroActionTypes.LOAD_HEROES_BY_NAME_SUCCESS;

  constructor(public payload: Hero[]) {}
}

export class LoadHeroesByNameFail implements Action {
  public readonly type = HeroActionTypes.LOAD_HEROES_BY_NAME_FAIL;

  constructor(public payload: string) {}
}

export class ResetHero implements Action {
  public readonly type = HeroActionTypes.RESET_HERO;
}

export type Actions =
  | LoadHeroes
  | LoadHeroesSuccess
  | LoadHeroesFail
  | LoadHero
  | LoadHeroSuccess
  | LoadHeroFail
  | CreateHero
  | CreateHeroSuccess
  | CreateHeroFail
  | UpdateHero
  | UpdateHeroSuccess
  | UpdateHeroFail
  | DeleteHero
  | DeleteHeroSuccess
  | DeleteHeroFail
  | LoadHeroesByName
  | LoadHeroesByNameSuccess
  | LoadHeroesByNameFail
  | ResetHero;
