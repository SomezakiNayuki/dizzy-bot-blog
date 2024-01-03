import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { ServerConfigurationService } from 'src/app/services/server-configuration.service';
import { DataCollector } from './demo/data.collector';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: User;

  private user: User;

  constructor(
    private http: HttpClient,
    private serverConfigService: ServerConfigurationService,

    private dataCollector: DataCollector
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
    let user = this.dataCollector.users.find(user => user.username == username);
    return of(user);
  }

}
