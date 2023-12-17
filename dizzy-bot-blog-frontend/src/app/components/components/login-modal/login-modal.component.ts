import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'dzb-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  // functional variables
  protected isRegistering: boolean = false;

  // form
  protected loginForm: FormGroup;

  // event observables
  private loginEventObservable$: Subject<any> = this.loginService.getLoginServiceEventSubject$();

  // observables
  protected authenticationObservable$: Subject<any> = this.loginService.getAuthenticationSubject$();

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  public ngOnInit(): void {
    this.loginEventObservable$.subscribe(data => {
      if (data == 'reinit') {
        this.init();
      }
    });

    this.init();
  }

  private init(): void {
    this.isRegistering = false;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: [''],
    });
  }

  protected onSubmit(): void {
    if (this.isRegistering) {
      this.onRegister();
    } else {
      const emailControl = this.loginForm.get('email');
      emailControl.clearValidators();
      emailControl.updateValueAndValidity();

      if (this.loginForm.valid) {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        
        this.loginService.login(username, password);
      }
    }
  }

  private onRegister(): void {
    const emailControl = this.loginForm.get('email');
    emailControl.clearValidators();
    emailControl.setValidators([Validators.email, Validators.required]);
    emailControl.updateValueAndValidity();

    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const email = this.loginForm.get('email').value;
      
      this.loginService.login(username, password, email);
    }
  }

  protected register(): void {
    this.isRegistering = !this.isRegistering;
  }

}
