import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../models/hero';
import { AppState } from '../store';
import {
  CreateHero,
  DeleteHero,
  LoadHeroesByName,
  UpdateHero,
} from '../store/hero/hero.actions';
import {
  getCurrentHero,
  getHeroes,
  getHeroesByName,
} from '../store/hero/hero.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesFacadeService {

  constructor(private store: Store<AppState>) {}

  public create(name: string): void {
    this.store.dispatch(new CreateHero({ name } as Hero));
  }

  public delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero.id));
  }

  public update(updatedHero: Hero): void {
    this.store.dispatch(new UpdateHero(updatedHero));
  }

  public searchByName(term: string): void {
    this.store.dispatch(new LoadHeroesByName(term));
  }

  public get heroes$(): Observable<Hero[]> {
    return this.store.select(getHeroes);
  }

  public get hero$(): Observable<Hero> {
    return this.store.select(getCurrentHero);
  }

  public get searchHeroesResult$(): Observable<Hero[]> {
    return this.store.select(getHeroesByName);
  }
}
