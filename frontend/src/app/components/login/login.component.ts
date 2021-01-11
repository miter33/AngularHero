import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private destroy: Subject<any> = new Subject();
  public invalidData: boolean = null;

  constructor(private accountFacade: AccountFacadeService) {}

  public login(email: string, password: string): void {
    this.accountFacade.login(email, password);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.accountFacade.errorLogin$
      .pipe(
        filter((error: any) => error != null),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.form.reset();
        this.invalidData = true;
      });
  }

  public ngOnDestroy(): any {
    this.destroy.next();
    this.destroy.complete();
  }
}
