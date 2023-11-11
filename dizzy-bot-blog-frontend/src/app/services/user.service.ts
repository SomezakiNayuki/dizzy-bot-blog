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

  // singleton user instance
  private user: User;

  // singleton user observable
  private user$: Observable<User>;

  constructor(private http: HttpClient) { }

  public getUser(): User {
    return this.user;
  }

  public fetchUser(username: string): void {
    this.user$ = this.getInfo(username);
    this.user$.subscribe(data => {
      this.user = data;
    });
  }

  private getInfo(username: string): Observable<User> {
    return this.http.post<User>(this.rootURL + '/getInfo', {
      username: username,
    });
  }

}
