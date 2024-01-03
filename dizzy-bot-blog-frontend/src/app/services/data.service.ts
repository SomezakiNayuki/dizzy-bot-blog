import { Injectable } from '@angular/core';
import { Observable, catchError, interval, of, startWith, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Experience } from 'src/app/models/experience';
import { PersonalInfo } from 'src/app/models/personal-info';
import { Blog } from 'src/app/models/blog';
import { UserService } from 'src/app/services/user.service';
import { Submitable } from 'src/app/models/submitable';
import { ExperienceType } from 'src/app/enumerations/experience.enum';
import { ServerConfigurationService } from 'src/app/services/server-configuration.service';
import { DataCollector } from 'src/app/services/demo/data.collector';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient, 
    private serverConfigService: ServerConfigurationService,
    private userService: UserService,

    private dataCollector: DataCollector
  ) {}

  public submit(submitable: Submitable): void {
    submitable.submit();
  }

  public createBlog(blog: Object): void {
    let user = this.dataCollector.users.find(user => user.username == blog['username']);
    user.blogs.push(blog as Blog);
  }

  public deleteBlog(id: number): void {
    this.dataCollector.users.forEach(user => {
      user.blogs = user.blogs.filter(blog => blog.id !== id);
    });
  }

  public getBlogs(): Observable<Blog[]> {
    return this.continuallyFetch<Blog[]>(1000, () => this.fetchBlogs());
  }

  private fetchBlogs(): Observable<Blog[]> {
    let blogs = new Array<Blog>();
    this.dataCollector.users.forEach(user => {
      user.blogs.forEach(blog => {
        blogs.push(blog);
      });
    });
    return of(blogs);
  }

  public createExperience(experience: Object): void {
    let user = this.dataCollector.users.find(user => user.username == experience['username']);
    user.experiences.push(experience as Experience);
  }

  public deleteExperience(id: number): void {
    this.dataCollector.users.forEach(user => {
      user.experiences = user.experiences.filter(experience => experience.id !== id);
    });
  }

  public getEducationHistory(): Observable<Experience[]> {
    return this.getExperiences(ExperienceType.EDUCATION);
  }

  public getEmploymentHistory(): Observable<Experience[]> {
    return this.getExperiences(ExperienceType.EMPLOYMENT);
  }

  public getExperienceHistory(): Observable<Experience[]> {
    return this.getExperiences(ExperienceType.EXPERIENCE);
  }

  public getSkillList(): Observable<Experience[]> {
    return this.getExperiences(ExperienceType.SKILL);
  }

  private getExperiences(type: string): Observable<Experience[]> {
    return this.continuallyFetch<Experience[]>(1000, () => this.fetchExperiences().pipe(
      switchMap(experiences => of(experiences.filter(experience => experience.type === type)))
    ));
  }

  private fetchExperiences(): Observable<Experience[]> {
    let user = this.dataCollector.users.find(user => user.username == this.userService.getCashedHost().username);
    return of(user.experiences);
  }

  public getPersonalInfo(): Observable<PersonalInfo> {
    return this.continuallyFetch<PersonalInfo>(1000, () => {
      this.userService.fetchUser(this.userService.getCashedUser().username);
      const targetUser = this.userService.getCashedUser();
      let personalInfo: PersonalInfo = {} as PersonalInfo;
      personalInfo.username = targetUser.username;
      personalInfo.userEmail = targetUser.email;
      personalInfo.userLinkedInUrl = targetUser.linkedInURL;
      personalInfo.userPhoneNumber = targetUser.phone;
      personalInfo.userUniversity = targetUser.university;
      return of(personalInfo);
    });
  }

  public updatePersonalInfo(personalInfo: Object): void {
    let user = this.dataCollector.users.find(user => user.username == this.userService.getCashedHost().username);
    user.linkedInURL = personalInfo['linkedInURL'];
    user.phone = personalInfo['phone'];
    user.university = personalInfo['university'];
  }

  public resetPersonalInfo(username: string): void {
    let user = this.dataCollector.users.find(user => user.username == this.userService.getCashedHost().username);
    user.linkedInURL = null;
    user.phone = null;
    user.university = null;
  }

  private continuallyFetch<T>(period: number, fn: () => Observable<T>): any {
    return interval(period).pipe(
      startWith(0),
      switchMap(fn)
    );
  }

  private serverErrorHandler(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
    }
    return throwError(() => errorMessage);
  }

}
