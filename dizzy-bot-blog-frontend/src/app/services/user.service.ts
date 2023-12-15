import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { DataCollector } from './demo/data.collector';

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

  constructor(private http: HttpClient, private dataCollector: DataCollector) { }

  public getUser(): User {
    return this.user;
  }

  public fetchUser(username: string): void {
    this.dataCollector.users.forEach(user => {
      if (user.username == username) {
        this.user$ = of(user);
      }
    });
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
