import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { UserService } from './user.service';
import { DataCollector } from './demo/data.collector';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // service configuration
  // [TODO] To be replaced by server-configuration.json
  private rootURL: string = 'http://localhost:8080/user';

  // functional variables
  private isLoggedIn: boolean = false;

  // event observables
  private loginServiceEventSubject$ = new Subject<any>();

  // observables
  private authenticationSubject$ = new Subject<any>();

  constructor(private http: HttpClient, private userService: UserService, private dataCollector: DataCollector) { }

  public login(username: string, password: string, email?: string): void {
    if (email) {
      let user = this.dataCollector.users.find(user => user.username == username && user.email == email);
      if (user) {
        this.loginErrorHandler(new HttpErrorResponse({
          status: 500,
          error: {
            message: 'User already exists'
          },
        }));
      } else {
        this.dataCollector.users.push({
          id: this.dataCollector.users.length,
          username: username,
          password: password,
          email: email,
          blogs: [],
          experiences: []
        });
        this.authenticationSubject$.next('200');
        $('#loginModal').modal('hide');
        this.isLoggedIn = true;
        this.userService.fetchUser(username, true);
      }
    } else {
      let user = this.dataCollector.users.find(user => user.username == username && user.password == password);
      if (user) {
        this.authenticationSubject$.next('200');
        $('#loginModal').modal('hide');
        this.isLoggedIn = true;
        this.userService.fetchUser(username, true);
      } else {
        this.loginErrorHandler(new HttpErrorResponse({
          status: 404,
          error: {
            message: 'Credential error or user not exists'
          },
        }));
      }
    }
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.userService.setHost(undefined);
    this.userService.setUser(undefined);
  }

  private loginErrorHandler(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
      this.authenticationSubject$.next(err.status);
    }
    return throwError(() => errorMessage);
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public reinitLoginModal(): void {
    this.loginServiceEventSubject$.next('reinit');
    this.authenticationSubject$.next('200');
  }

  public getLoginServiceEventSubject$(): Subject<any> {
    return this.loginServiceEventSubject$;
  }

  public getAuthenticationSubject$(): Subject<any> {
    return this.authenticationSubject$;
  }

}
