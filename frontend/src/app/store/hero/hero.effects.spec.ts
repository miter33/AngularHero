import {
  LoadHeroesSuccess,
  LoadHeroSuccess,
  CreateHeroSuccess,
  LoadHeroes,
  LoadHero,
  LoadHeroFail,
  CreateHeroFail,
  UpdateHero,
  UpdateHeroSuccess,
  UpdateHeroFail,
  DeleteHero,
  DeleteHeroSuccess,
  DeleteHeroFail,
} from './hero.actions';
import { HeroService } from './../../services/heroes-repository.service';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HeroEffect } from './hero.effects';
import { Observable, of, throwError } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Hero } from 'src/app/models/hero';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {
  LoadHeroesFail,
  CreateHero,
  LoadHeroesByName,
  LoadHeroesByNameSuccess,
  LoadHeroesByNameFail,
} from './hero.actions';
import { Actions } from '@ngrx/effects';

describe('Effect: HeroEffect', () => {
  let actions$: Observable<Action>;
  let effects: HeroEffect;
  const heroes: Hero[] = [
    { id: 1, name: 'Michael' },
    { id: 2, name: 'Micky' },
  ];
  const hero: Hero = { id: 1, name: 'Michael' };
  const heroService: jasmine.SpyObj<HeroService> = jasmine.createSpyObj(
    'HeroService',
    [
      'getHeroes',
      'getHero',
      'deleteHero',
      'updateHero',
      'addHero',
      'searchHeroes',
    ]
  );
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          HeroEffect,
          provideMockActions(() => actions$),
          provideMockStore({}),
          {
            provide: HeroService,
            useValue: heroService,
          },
        ],
      });
      effects = TestBed.inject(HeroEffect);
      actions$ = TestBed.inject(Actions);
    })
  );

  it('should create HeroEffect', () => {
    expect(effects).toBeTruthy();
  });

  describe('load heroes', () => {
    beforeEach(() => {
      actions$ = cold('-c---|', { c: new LoadHeroes() });
    });
    describe('when retrieving successfully', () => {
      beforeEach(() => {
        heroService.getHeroes.and.returnValue(of(heroes));
      });
      it('should emit success action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new LoadHeroesSuccess(heroes),
        });
        expect(effects.getHeroes$).toBeObservable(expected);
        expect(heroService.getHeroes).toHaveBeenCalled();
      });
    });

    describe('when retrieving failed', () => {
      beforeEach(() => {
        heroService.getHeroes.and.returnValue(throwError('error'));
      });
      it('should emit error action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new LoadHeroesFail('error'),
        });
        expect(effects.getHeroes$).toBeObservable(expected);
      });
    });
  });

  describe('load hero', () => {
    beforeEach(() => {
      actions$ = cold('-c---|', { c: new LoadHero(hero.id) });
    });
    describe('when retrieving successfully', () => {
      beforeEach(() => {
        heroService.getHero.and.returnValue(of(hero));
      });
      it('should emit success action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new LoadHeroSuccess(hero),
        });
        expect(effects.getHero$).toBeObservable(expected);
        expect(heroService.getHero).toHaveBeenCalled();
      });
    });

    describe('when retrieving failed', () => {
      beforeEach(() => {
        heroService.getHero.and.returnValue(throwError('error'));
      });
      it('should emit error action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new LoadHeroFail('error'),
        });
        expect(effects.getHero$).toBeObservable(expected);
      });
    });
  });

  describe('create hero', () => {
    beforeEach(() => {
      actions$ = cold('-c---|', { c: new CreateHero(hero) });
    });
    describe('when creating successfully', () => {
      beforeEach(() => {
        heroService.addHero.and.returnValue(of(hero));
      });
      it('should emit success action', () => {
        const expected: Observable<Action> = cold('-(cd)|', {
          c: new CreateHeroSuccess(hero),
          d: new LoadHeroes(),
        });
        expect(effects.createHero$).toBeObservable(expected);
        expect(heroService.addHero).toHaveBeenCalled();
      });
    });

    describe('when creating failed', () => {
      beforeEach(() => {
        heroService.addHero.and.returnValue(throwError('error'));
      });
      it('should emit error action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new CreateHeroFail('error'),
        });
        expect(effects.createHero$).toBeObservable(expected);
      });
    });
  });

  describe('update hero', () => {
    beforeEach(() => {
      actions$ = cold('-c---|', { c: new UpdateHero(hero) });
    });
    describe('when updating successfully', () => {
      beforeEach(() => {
        heroService.updateHero.and.returnValue(of(hero));
      });
      it('should emit success action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new UpdateHeroSuccess({ id: 1, changes: hero }),
        });
        expect(effects.updateHero$).toBeObservable(expected);
        expect(heroService.updateHero).toHaveBeenCalled();
      });
    });

    describe('when updating failed', () => {
      beforeEach(() => {
        heroService.updateHero.and.returnValue(throwError('error'));
      });
      it('should emit error action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new UpdateHeroFail('error'),
        });
        expect(effects.updateHero$).toBeObservable(expected);
      });
    });
  });

  describe('delete hero', () => {
    beforeEach(() => {
      actions$ = cold('-c---|', { c: new DeleteHero(hero.id) });
    });
    describe('when removing successfully', () => {
      beforeEach(() => {
        heroService.deleteHero.and.returnValue(of(hero));
      });
      it('should emit success action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new DeleteHeroSuccess(hero.id),
        });
        expect(effects.deleteHero$).toBeObservable(expected);
        expect(heroService.deleteHero).toHaveBeenCalled();
      });
    });

    describe('when removing failed', () => {
      beforeEach(() => {
        heroService.deleteHero.and.returnValue(throwError('error'));
      });
      it('should emit error action', () => {
        const expected: Observable<Action> = cold('-c---|', {
          c: new DeleteHeroFail('error'),
        });
        expect(effects.deleteHero$).toBeObservable(expected);
      });
    });
  });

  describe('load heroes by name', () => {
    beforeEach(() => {
      actions$ = cold('--a-b-', {
        a: new LoadHeroesByName('value'),
        b: new LoadHeroesByName('value'),
      });
    });
    describe('when retrieving successfully', () => {
      beforeEach(() => {
        heroService.searchHeroes.and.returnValue(of(heroes));
      });
      it('should emit success action', () => {
        const expected: Observable<Action> = cold('-------a', {
          a: new LoadHeroesByNameSuccess(heroes),
        });
        expect(
          effects.getHeroesByName$({
            debounce: 30,
            scheduler: getTestScheduler(),
          })
        ).toBeObservable(expected);
      });
    });

    describe('when retrieving failed', () => {
      beforeEach(() => {
        heroService.searchHeroes.and.returnValue(throwError('error'));
      });
      it('should emit error action', () => {
        const expected: Observable<Action> = cold('-------a', {
          a: new LoadHeroesByNameFail('error'),
        });
        expect(
          effects.getHeroesByName$({
            debounce: 30,
            scheduler: getTestScheduler(),
          })
        ).toBeObservable(expected);
      });
    });
  });
});
