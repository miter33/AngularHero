import { Component } from '@angular/core';
import { AccountService } from './services/account-repository.service';
import { Router } from '@angular/router';
import { AccountFacadeService } from './services/account-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(
    public route: Router,
    private accountFasade: AccountFacadeService
  ) {}

  public logout(): void {
    this.accountFasade.logout();
  }
}
