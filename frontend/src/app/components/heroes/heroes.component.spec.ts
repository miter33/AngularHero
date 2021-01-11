import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HeroesFacadeService } from 'src/app/services/heroes-facade.service';
import { HeroesComponent } from './heroes.component';
import { Observable, of } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Router } from '@angular/router';

class MockHeroesFacadeService {
  public get heroes$(): Observable<Hero[]> {
    return of(mockHeroes);
  }
}

const mockHeroes: Hero[] = [
  { id: 1, name: 'Alex' },
  { id: 2, name: 'Bob' },
];

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesService: HeroesFacadeService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeroesComponent, HeroDetailComponent],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'detail/:id', component: HeroDetailComponent },
          ]),
        ],
        providers: [
          { provide: HeroesFacadeService, useClass: MockHeroesFacadeService },
        ],
      }).compileComponents();
      heroesService = TestBed.inject(HeroesFacadeService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return heroes', () => {
    component.heroes$.subscribe((heroes: Hero[]) => {
      expect(heroes).toEqual(mockHeroes);
    });
  });


  describe('checking the form to create a hero', () => {
    it('should correctly validate heroName field', () => {
      component.form.controls.heroName.setValue('');
      expect(component.validHeroByRequired).toBeFalse();
      component.form.controls.heroName.setValue('a');
      expect(component.validHeroByLength).toBeFalse();
      component.form.controls.heroName.setValue('abc');
      expect(component.validForm).toBeTruthy();
    });
  });

  it('should navigate to detail page', inject(
    [Router],
    (router: Router) => {
      const hero: Hero = { id: 1, name: 'John' };
      spyOn(router, 'navigateByUrl');
      component.goToDetail(hero.id);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/detail/1');
    }
  ));
});
