import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { Observable } from 'rxjs';
import { HeroesFacadeService } from 'src/app/services/heroes-facade.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public form: FormGroup;
  public heroes$: Observable<Hero[]>;

  constructor(
    private heroesFacade: HeroesFacadeService,
    private router: Router
  ) {}

  public create(name: string): void {
    this.heroesFacade.create(name);
  }

  public delete(hero: Hero): void {
    this.heroesFacade.delete(hero);
  }

  public goToDetail(id: number): void {
    const url = `/detail/${id}`;
    this.router.navigateByUrl(url);
  }

  public get validForm(): boolean {
    return this.form.valid;
  }

  public get validHeroByLength(): boolean {
    return !(
      this.form.controls.heroName.errors.minlength &&
      this.form.controls.heroName.errors.minlength.requiredLength
    );
  }

  public get validHeroByRequired(): boolean {
    return !(
      this.form.controls.heroName.errors.required
    );
  }

  public get validHeroAfterTouch(): boolean {
    return !(
      this.form.controls.heroName.invalid && this.form.controls.heroName.touched
    );
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      heroName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
    this.heroes$ = this.heroesFacade.heroes$;
  }
}
