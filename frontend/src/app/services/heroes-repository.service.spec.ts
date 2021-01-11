import { TestBed } from '@angular/core/testing';
import { HeroService } from './heroes-repository.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Hero } from '../models/hero';
import { HttpErrorResponse } from '@angular/common/http';

describe('Service: HeroService', () => {
  let heroService: HeroService;
  let httpMock: HttpTestingController;
  const mockHeroes: Hero[] = [
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Bill' },
  ];
  const mockHero: Hero = { name: 'Mario', id: 1 };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    heroService = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(heroService).toBeTruthy();
  });

  describe('get heroes', () => {
    it('should call method GET', () => {
      heroService.getHeroes().subscribe(() => {
        expect(request.request.method).toBe('GET');
      });
      const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
      request.flush(mockHeroes);
    });

    describe('when GET finished successfully', () => {
      it('should return heroes', () => {
        heroService.getHeroes().subscribe((heroes: Hero[]) => {
          expect(heroes).toEqual(mockHeroes);
        });
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(mockHeroes);
      });
    });
    describe('when GET failed', () => {
      it('should return an error when the server return 405', () => {
        const errorMessage = 'test 405 error';
        heroService.getHeroes().subscribe(
          () => {
            fail('failing with error 405, Method Not Allowed');
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(405);
            expect(error.error).toEqual(errorMessage);
          }
        );
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(errorMessage, {
          status: 405,
          statusText: 'Method Not Allowed',
        });
      });
    });
  });

  describe('get hero', () => {
    it('should call method GET', () => {
      heroService.getHero(mockHero.id).subscribe(() => {
        expect(request.request.method).toBe('GET');
      });
      const request = httpMock.expectOne(
        `${heroService.baseUrl}/hero/${mockHero.id}`
      );
      request.flush(mockHero);
    });

    describe('when GET finished successfully', () => {
      it('should return hero', () => {
        heroService.getHero(mockHero.id).subscribe((hero: Hero) => {
          expect(hero).toEqual(mockHero);
        });
        const request = httpMock.expectOne(
          `${heroService.baseUrl}/hero/${mockHero.id}`
        );
        request.flush(mockHero);
      });
    });
    describe('when GET failed', () => {
      it('should return an error when the server return 405', () => {
        const errorMessage = 'test 405 error';
        heroService.getHeroes().subscribe(
          () => {
            fail('failing with error 405, Method Not Allowed');
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(405);
            expect(error.error).toEqual(errorMessage);
          }
        );
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(errorMessage, {
          status: 405,
          statusText: 'Method Not Allowed',
        });
      });
    });
  });

  describe('create hero', () => {
    it('should call method POST', () => {
      heroService.addHero({ name: mockHero.name } as Hero).subscribe(() => {
        expect(request.request.method).toBe('POST');
      });
      const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
      request.flush(mockHero);
    });

    describe('when POST finished successfully', () => {
      it('should create hero', () => {
        heroService
          .addHero({ name: mockHero.name } as Hero)
          .subscribe((hero: Hero) => {
            expect(hero).toEqual(mockHero);
          });
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(mockHero);
      });
    });
    describe('when POST failed', () => {
      it('should return an error when the server return 405', () => {
        const errorMessage = 'test 405 error';
        heroService.getHeroes().subscribe(
          () => {
            fail('failing with error 405, Method Not Allowed');
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(405);
            expect(error.error).toEqual(errorMessage);
          }
        );
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(errorMessage, {
          status: 405,
          statusText: 'Method Not Allowed',
        });
      });
    });
  });

  describe('update hero', () => {
    it('should call method PUT', () => {
      heroService.updateHero(mockHero).subscribe(() => {
        expect(request.request.method).toBe('PUT');
      });
      const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
      request.flush(mockHero);
    });

    describe('when PUT finished successfully', () => {
      it('should update hero', () => {
        heroService.updateHero(mockHero).subscribe((hero: Hero) => {
          expect(hero).toEqual(mockHero);
        });
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(mockHero);
      });
    });
    describe('when PUT failed', () => {
      it('should return an error when the server return 405', () => {
        const errorMessage = 'test 405 error';
        heroService.getHeroes().subscribe(
          () => {
            fail('failing with error 405, Method Not Allowed');
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(405);
            expect(error.error).toEqual(errorMessage);
          }
        );
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(errorMessage, {
          status: 405,
          statusText: 'Method Not Allowed',
        });
      });
    });
  });

  describe('delete hero', () => {
    it('should call method DELETE', () => {
      heroService.deleteHero(mockHero.id).subscribe(() => {
        expect(request.request.method).toBe('DELETE');
      });
      const request = httpMock.expectOne(
        `${heroService.baseUrl}/hero/${mockHero.id}`
      );
      request.flush(mockHero);
    });

    describe('when DELETE finished successfully', () => {
      it('should delete hero', () => {
        heroService.deleteHero(mockHero.id).subscribe((hero: Hero) => {
          expect(hero.id).toEqual(1);
        });
        const request = httpMock.expectOne(
          `${heroService.baseUrl}/hero/${mockHero.id}`
        );
        request.flush(mockHero);
      });
    });
    describe('when DELETE failed', () => {
      it('should return an error when the server return 405', () => {
        const errorMessage = 'test 405 error';
        heroService.getHeroes().subscribe(
          () => {
            fail('failing with error 405, Method Not Allowed');
          },
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(405);
            expect(error.error).toEqual(errorMessage);
          }
        );
        const request = httpMock.expectOne(`${heroService.baseUrl}/hero`);
        request.flush(errorMessage, {
          status: 405,
          statusText: 'Method Not Allowed',
        });
      });
    });
  });
});
