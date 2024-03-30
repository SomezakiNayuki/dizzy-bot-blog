import { Injectable, Injector } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { Blog } from 'src/app/models/blog';
import { PersonalInfo } from 'src/app/models/personal-info';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SubmitablFactory {

  private blogId: number = -1;
  private expId: number = -1;
  
  constructor(
    private injector: Injector
  ) {}

  public getBlogInstance(): Blog {
    this.blogId++;
    return new Blog(this.injector.get(DataService), this.injector.get(UserService), this.blogId);
  }

  public getPersonalInfoInstance(): PersonalInfo {
    return new PersonalInfo(this.injector.get(DataService), this.injector.get(UserService));
  }

  public getExperienceInstance(): Experience {
    this.expId++;
    return new Experience(this.injector.get(DataService), this.injector.get(UserService), this.expId);
  }

}