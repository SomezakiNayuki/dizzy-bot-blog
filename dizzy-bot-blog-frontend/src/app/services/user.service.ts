import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // [TODO] To be replaced by server-configuration.json
  private rootURL: string = 'http://localhost:8080/user';

  private host: User;

  private user: User;

  constructor(private http: HttpClient) {}

  public getCashedHost(): User {
    return this.host;
  }

  public getCashedUser(): User {
    return this.user;
  }

  public clearCashedUser(): void {
    this.user = undefined;
  }

  public clearCashedHost(): void {
    this.host = undefined;
  }

  public fetchUser(username: string, callback?: Function): void {
    this.getUserInfo(username).subscribe(user => {
      this.user = user;
      if (callback) { callback(); }
    });
  }

  public fetchHost(username: string, callback?: Function) {
    this.getUserInfo(username).subscribe(user => {
      this.host = user;
      if (callback) { callback(); }
    });
  }

  private getUserInfo(username: string): Observable<User> {
    return this.http.post<User>(this.rootURL + '/getInfo', { username: username, });
  }

}
