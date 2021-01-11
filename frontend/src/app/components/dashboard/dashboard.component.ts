import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hero } from '../../models/hero';
import { HeroesFacadeService } from '../../services/heroes-facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy: Subject<any> = new Subject();
  public heroes: Hero[] = [];

  constructor(private heroesFacade: HeroesFacadeService) {}

  public ngOnInit(): void {
    this.heroesFacade.heroes$
      .pipe(takeUntil(this.destroy))
      .subscribe((heroes: Hero[]) => (this.heroes = heroes.slice(1, 5)));
  }

  public ngOnDestroy(): any {
    this.destroy.next();
    this.destroy.complete();
  }
}
