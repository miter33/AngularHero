import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero`);
  }

  public getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/hero/${id}`);
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(`${this.baseUrl}/hero`, hero, this.httpOptions);
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/hero`, hero, this.httpOptions);
  }

  public deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    return this.http.delete<Hero>(
      `${this.baseUrl}/hero/${id}`,
      this.httpOptions
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return this.getHeroes();
    }
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/search?name=${term}`);
  }
}
