import { Injectable } from '@angular/core';
import { Submitable } from 'src/app/models/submitable';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class Blog implements Submitable {

  public id: number;

  public content: string;
  public date: string;
  public image: string;
  public likes: number;
  public subtitle: string;
  public title: string;
  public username: string;

  constructor(
    private _dataService: DataService,
    private _userService: UserService
  ) {}

  private generateSubmitable(): void {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');
    this.date = formattedDate;
    this.likes = 0;
    this.username = this._userService.getCashedHost().username;
  }

  public submit(): void {
    this.generateSubmitable();
    this._dataService.createBlog(this.toObject(this));
  }

  public toObject(object: Submitable): Object {
    let obj = {};
    Object.keys(object).forEach(key => {
      if (key[0] !== '_') {
        obj[key] = object[key];
      }
    });
    return obj;
  }

}
