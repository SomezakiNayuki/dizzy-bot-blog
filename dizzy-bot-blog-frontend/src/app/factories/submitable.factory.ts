import { Injectable, Injector } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { Blog } from 'src/app/models/blog';
import { PersonalInfo } from 'src/app/models/personal-info';

@Injectable({
  providedIn: 'root'
})
export class SubmitablFactory {
  
  constructor(
    private injector: Injector
  ) {}

  public getBlogInstance(): Blog {
    return this.copyObject<Blog>(this.injector.get(Blog));
  }

  public getPersonalInfoInstance(): PersonalInfo {
    return this.copyObject<PersonalInfo>(this.injector.get(PersonalInfo));
  }

  public getExperienceInstance(): Experience {
    return this.copyObject<Experience>(this.injector.get(Experience));
  }

  /* 
    All injectable models are provided in a way similar to services,
    which means all models are in singleton pattern,
    to prevent attribute 'type' being overriden by last instance change,
    a copy of original model instance is needed
  */
  private copyObject<T>(src: T): T {
    let obj: any = {};
    Object.assign(obj, src);
    this.copyMethods(src, obj);
    return obj as T;
  }

  private copyMethods(source: any, destination: any) {
    const sourcePrototype = Object.getPrototypeOf(source);

    Object.getOwnPropertyNames(sourcePrototype).forEach((methodName) => {
      if (typeof sourcePrototype[methodName] === 'function') {
        destination[methodName] = sourcePrototype[methodName].bind(destination);
      }
    });
  }

}