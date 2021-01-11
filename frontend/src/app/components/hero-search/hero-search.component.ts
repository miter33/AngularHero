import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { HeroesFacadeService } from '../../services/heroes-facade.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  public searchHeroesResult$: Observable<Hero[]>;

  constructor(private heroesFacade: HeroesFacadeService) {}

  public searchByName(term: string): void {
    this.heroesFacade.searchByName(term);
  }

  public ngOnInit(): void {
    this.searchHeroesResult$ = this.heroesFacade.searchHeroesResult$;
  }
}
