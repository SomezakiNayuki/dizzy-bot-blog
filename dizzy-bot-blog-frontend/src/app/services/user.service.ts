import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // service configuration
  // [TODO] To be replaced by server-configuration.json
  private rootURL: string = 'http://localhost:8080/user';

  private host: User;

  private user: User;

  private user$: Observable<User>;

  constructor(private http: HttpClient) { }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getHost(): User {
    return this.host;
  }

  public setHost(user: User): void {
    this.host = user;
  }

  public fetchUser(username: string, saveHost?: boolean, callback?: Function): void {
    this.user$ = this.getInfo(username);
    this.user$.subscribe(data => {
      this.user = data;
      if (saveHost) { this.host = data; }
      if (callback) { callback(); }
    });
  }

  private getInfo(username: string): Observable<User> {
    return this.http.post<User>(this.rootURL + '/getInfo', {
      username: username,
    });
  }

}
