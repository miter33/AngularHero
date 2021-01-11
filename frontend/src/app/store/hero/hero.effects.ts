import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  CreateHero,
  CreateHeroFail,
  CreateHeroSuccess,
  DeleteHero,
  DeleteHeroFail,
  DeleteHeroSuccess,
  HeroActionTypes,
  LoadHero,
  LoadHeroes,
  LoadHeroesByName,
  LoadHeroesByNameFail,
  LoadHeroesByNameSuccess,
  LoadHeroesFail,
  LoadHeroesSuccess,
  LoadHeroFail,
  LoadHeroSuccess,
  UpdateHero,
  UpdateHeroFail,
  UpdateHeroSuccess,
} from './hero.actions';
import {
  catchError,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { HeroService } from 'src/app/services/heroes-repository.service';
import { Hero } from 'src/app/models/hero';
import { asyncScheduler } from 'rxjs';

@Injectable()
export class HeroEffect {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  public getHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadHeroes>(HeroActionTypes.LOAD_HEROES),
      switchMap(() =>
        this.heroService.getHeroes().pipe(
          map((heroes: Hero[]) => new LoadHeroesSuccess(heroes)),
          catchError((error: any) => of(new LoadHeroesFail(error)))
        )
      )
    )
  );

  public getHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadHero>(HeroActionTypes.LOAD_HERO),
      switchMap((action: LoadHero) =>
        this.heroService.getHero(action.payload).pipe(
          map((hero: Hero) => new LoadHeroSuccess(hero)),
          catchError((error: any) => of(new LoadHeroFail(error)))
        )
      )
    )
  );

  public createHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateHero>(HeroActionTypes.CREATE_HERO),
      switchMap((action: CreateHero) =>
        this.heroService.addHero(action.payload).pipe(
          switchMap((hero: Hero) => [
            new CreateHeroSuccess(hero),
            new LoadHeroes(),
          ]),
          catchError((error: any) => of(new CreateHeroFail(error)))
        )
      )
    )
  );

  public updateHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateHero>(HeroActionTypes.UPDATE_HERO),
      switchMap((action: UpdateHero) =>
        this.heroService.updateHero(action.payload).pipe(
          map(
            (updateHero: Hero) =>
              new UpdateHeroSuccess({
                id: updateHero.id,
                changes: updateHero,
              })
          ),
          catchError((error: any) => of(new UpdateHeroFail(error)))
        )
      )
    )
  );

  public deleteHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteHero>(HeroActionTypes.DELETE_HERO),
      switchMap((action: DeleteHero) =>
        this.heroService.deleteHero(action.payload).pipe(
          map(() => new DeleteHeroSuccess(action.payload)),
          catchError((error: any) => of(new DeleteHeroFail(error)))
        )
      )
    )
  );

  public getHeroesByName$: ({ debounce, scheduler }?: any) => Observable<Action> = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType<LoadHeroesByName>(HeroActionTypes.LOAD_HEROES_BY_NAME),
        debounceTime(debounce, scheduler),
        distinctUntilChanged(),
        switchMap((action: LoadHeroesByName) =>
          this.heroService.searchHeroes(action.payload).pipe(
            map((heroes: Hero[]) => new LoadHeroesByNameSuccess(heroes)),
            catchError((error: any) => of(new LoadHeroesByNameFail(error)))
          )
        )
      )
  );
}
