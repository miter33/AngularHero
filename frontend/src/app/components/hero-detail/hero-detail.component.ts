import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Hero } from 'src/app/models/hero';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesFacadeService } from 'src/app/services/heroes-facade.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  public heroForm: FormGroup;
  private destroy: Subject<any> = new Subject();

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private heroesFacade: HeroesFacadeService
  ) {}

  public goBack(): void {
    this.location.back();
  }

  public update(): void {
    const updatedHero: Hero = {
      name: this.heroForm.get('name').value,
      id: this.heroForm.get('id').value,
    };
    this.heroesFacade.update(updatedHero);
    this.goBack();
  }

  public ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      id: null,
    });
    this.heroesFacade.hero$
      .pipe(
        filter<Hero>(Boolean),
        takeUntil(this.destroy)
      )
      .subscribe((currentHero: Hero) => {
        this.heroForm.patchValue({
          name: currentHero.name,
          id: currentHero.id,
        });
      });
  }

  public ngOnDestroy(): any {
    this.destroy.next();
    this.destroy.complete();
  }
}
