import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  LoadHero,
  LoadHeroes
} from '../hero/hero.actions';

@Injectable()
export class RouterEffect {
  constructor(private actions$: Actions) {}

  @Effect()
  public routerNavigated$: Observable<Action> = this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    switchMap((navigateAction: RouterNavigatedAction) => {
      if (navigateAction.payload.routerState.url.startsWith('/detail')) {
        return of(
          new LoadHero(
            navigateAction.payload.routerState.root.firstChild.params.id
          )
        );
      } else {
        return of(new LoadHeroes());
      }
    })
  );
}
