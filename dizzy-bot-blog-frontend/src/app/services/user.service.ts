import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ServerConfigurationService } from 'src/app/services/server-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: User;

  private user: User;

  constructor(
    private http: HttpClient,
    private serverConfigService: ServerConfigurationService
  ) {}

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
    return this.http.post<User>(this.serverConfigService.getUserInfoURL(), { username: username, });
  }

}
