import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'dzb-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  // functional variables
  protected isRegistered: boolean = true;

  // form
  protected loginForm: FormGroup;

  // event observables
  private loginEventObservable$: Observable<any> = this.loginService.getLoginServiceEventSubject();

  // observables
  protected authenticationObservable$: Observable<any> = this.loginService.getAuthenticationSubject();

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
    this.isRegistered = true;

    // [TODO] Set up event listener to clear username and password every time modal gets opened
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: [''],
    });
  }

  protected onSubmit(): void {
    const emailControl = this.loginForm.get('email');
    emailControl.clearValidators();
    emailControl.updateValueAndValidity();

    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      
      this.loginService.login(username, password);
    }
  }

  protected onRegister(): void {
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

}
