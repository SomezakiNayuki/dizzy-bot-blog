import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationStatus } from 'src/app/enumerations/authentication.enum';
import { ServerConfigurationService } from 'src/app/services/server-configuration.service';
import { DataCollector } from 'src/app/services/demo/data.collector';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private initLoginModal$ = new BehaviorSubject<void>(undefined);
  private authenticationResponse$ = new Subject<AuthenticationStatus>();

  constructor(
    private http: HttpClient, 
    private serverConfigService: ServerConfigurationService,
    private userService: UserService,

    private dataCollector: DataCollector
  ) {}

  public register(username: string, password: string, email: string) {
    const payload = {
      username: username,
      password: password,
      email: email,
    };

    const callbacks = [
      () => { this.authenticationResponse$.next(AuthenticationStatus.OK); },
      () => { this.closeLoginModal() },
      () => { this.userService.fetchHost(username); },
      () => { this.userService.fetchUser(username); },
    ];

    this.authentication(this.serverConfigService.getRegisterURL(), payload, callbacks);
  }

  public login(username: string, password: string): void {
    const payload = {
      username: username,
      password: password,
    };

    const callbacks = [
      () => { this.authenticationResponse$.next(AuthenticationStatus.OK); },
      () => { this.closeLoginModal() },
      () => { this.userService.fetchHost(username); },
      () => { this.userService.fetchUser(username); },
    ];

    this.authentication(this.serverConfigService.getLoginURL(), payload, callbacks);
  }

  public logout(): void {
    this.userService.clearCashedHost();
    this.userService.clearCashedUser();
  }

  private authentication(path: string, payload: Object, callbacks?: Function[]): void {
    if (path === this.serverConfigService.getLoginURL()) {
      let user = this.dataCollector.users.find(user => user.username == payload['username'] && user.password == payload['password']);
      if (user) {
        callbacks.forEach(fn => { fn() });
      } else {
        this.authenticationErrorHandler(new HttpErrorResponse({
          status: AuthenticationStatus.NOT_FOUND,
          error: {
            message: 'Credential error or user not exists'
          },
        }));
      }
    } else if (path === this.serverConfigService.getRegisterURL()) {
      let user = this.dataCollector.users.find(user => user.username == payload['username'] || user.email == payload['email']);
      if (user) {
        this.authenticationErrorHandler(new HttpErrorResponse({
          status: AuthenticationStatus.OK,
          error: {
            message: 'User already exists'
          },
        }));
      } else {
        this.dataCollector.users.push({
          id: this.dataCollector.users.length,
          username: payload['username'],
          password: payload['password'],
          email: payload['email'],
          blogs: [],
          experiences: [],
          archivedBlogs: []
        });
        callbacks.forEach(fn => { fn() });
      }
    }
  }

  private authenticationErrorHandler(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
      this.authenticationResponse$.next(err.status);
    }
    return throwError(() => errorMessage);
  }

  public isLoggedIn(): boolean {
    return this.userService.getCashedHost() !== undefined;
  }

  public getInitLoginModal$(): Subject<any> {
    return this.initLoginModal$;
  }

  public getAuthenticationResponse$(): Subject<any> {
    return this.authenticationResponse$;
  }

  private reinitLoginModal(): void {
    this.initLoginModal$.next();
    this.authenticationResponse$.next(AuthenticationStatus.OK);
  }

  public openLoginModal(): void {
    this.reinitLoginModal();
    $('#loginModal').modal('show');
  }

  public closeLoginModal(): void {
    $('#loginModal').modal('hide');
  }

}
