import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthenticationStatus } from 'src/app/enumerations/authentication.enum';
import { LabelService } from 'src/app/pipes/label.service';
import { LoginService } from 'src/app/services/login.service';
import * as label from 'src/app/components/components/login-modal/login-modal.label.json';

@Component({
  selector: 'dzb-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  providers: [LabelService]
})
export class LoginModalComponent implements OnInit {

  protected AUTH_NOT_FOUND: AuthenticationStatus = AuthenticationStatus.NOT_FOUND;
  protected AUTH_ERROR: AuthenticationStatus = AuthenticationStatus.ERROR;

  protected authenticationResponse$: Subject<any> = this.loginService.getAuthenticationResponse$();
  protected isRegistering: boolean = false;
  protected loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private labelService: LabelService,
    private loginService: LoginService
  ) {}

  public ngOnInit(): void {
    this.loginService.getInitLoginModal$().subscribe(() => {
      this.init();
    });

    this.labelService.loadScreenLabelConfiguration(label);
    this.init();
  }

  private init(): void {
    this.isRegistering = false;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  protected register(): void {
    this.isRegistering = !this.isRegistering;
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
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const email = this.loginForm.get('email').value;
      
      this.loginService.register(username, password, email);
    }
  }

}
