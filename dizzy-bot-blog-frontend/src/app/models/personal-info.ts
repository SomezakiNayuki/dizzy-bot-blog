import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { Submitable } from 'src/app/models/submitable';

export class PersonalInfo implements Submitable {

  public username: string;
  
  public userEmail: string;
  public userLinkedInUrl: string;
  public userPhoneNumber: string;
  public userUniversity: string;

  constructor(
    private _dataService: DataService,
    private _userService: UserService
  ) {}

  private generateSubmitable(): void {
    this.username = this._userService.getCashedHost().username;
  }

  public submit(): void {
    this.generateSubmitable();
    this._dataService.updatePersonalInfo(this.toObject(this));
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
