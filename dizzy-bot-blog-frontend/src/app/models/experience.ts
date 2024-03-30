import { ExperienceType } from 'src/app/enumerations/experience.enum';
import { UserService } from 'src/app/services/user.service';
import { Submitable } from 'src/app/models/submitable';
import { DataService } from 'src/app/services/data.service';

export class Experience implements Submitable {

  public id: number = 0;

  public description?: string;
  public institution?: string;
  public location?: string;
  public period?: string;
  public type: ExperienceType;
  public title?: string;
  private username: string;

  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _id: number
  ) {
    this.id = _id;
  }

  private generateSubmitable(): void {
    this.username = this._userService.getCashedHost().username;
  }

  public submit(): void {
    this.generateSubmitable();
    this._dataService.createExperience(this.toObject(this));
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
