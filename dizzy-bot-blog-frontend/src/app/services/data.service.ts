import { Injectable } from '@angular/core';
import { Observable, catchError, filter, interval, of, startWith, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Experience } from '../models/experience';
import { PersonalInfo } from '../models/personal-info';
import { Blog } from '../models/blog';
import { UserService } from './user.service';
import { DataCollector } from './demo/data.collector';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private blogId: number = 0;

  // service configuration
  // [TODO] To be replaced by server-configuration.json
  private rootURL: string = 'assets/mock-data/';

  // about-me data
  private personalInfoURL: string = `${this.rootURL}PersonalInfoDataBase/personalInfo.json`;

  // home data
  private blogURL: string = 'http://localhost:8080/blog';
  private experienceURL: string = 'http://localhost:8080/experience';

  constructor(private http: HttpClient, private userService: UserService, private dataCollector: DataCollector) { }

  public submit(obj: Object, type: string): void {
    switch (type) {
      case 'Blog':
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');

        obj['id'] = this.blogId;
        obj['username'] = this.userService.getUser().username;
        obj['likes'] = 0;
        obj['date'] = formattedDate;
        this.createBlog(obj as Blog);

        this.blogId++;
        break;
      case 'Experience':
        obj['type'] = 'Experience';
        obj['username'] = this.userService.getUser().username;
        this.createExperience(obj);
        break;
      case 'Employment':
        obj['type'] = 'Employment';
        obj['username'] = this.userService.getUser().username;
        this.createExperience(obj);
        break;
      case 'Education':
        obj['type'] = 'Education';
        obj['username'] = this.userService.getUser().username;
        this.createExperience(obj);
        break;
      case 'Skill':
        obj['type'] = 'Skill';
        obj['username'] = this.userService.getUser().username;
        this.createExperience(obj);
        break;
      case 'PersonalInfo':
        obj['username'] = this.userService.getUser().username;
        this.updatePersonalInfo(obj);
        break;
      default:
        throwError(() => new Error('Unknown type'));
    }
  }

  public getEmploymentHistory(): Observable<Experience[]> {
    return this.getExperiences('Employment');
  }

  public getPersonalInfo(): Observable<PersonalInfo> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => {
        this.userService.fetchUser(this.userService.getUser().username);
        let personalInfo: PersonalInfo = {
          username: this.userService.getUser().username,
          userEmail: this.userService.getUser().email,
          userLinkedInUrl: this.userService.getUser().linkedInURL,
          userPhoneNumber: this.userService.getUser().phone,
          userAcademicDegree: undefined,
          userAcademicDescription1: undefined,
          userAcademicDescription2: undefined,
          userUniversity: this.userService.getUser().university
        };
        return of(personalInfo);
      })
    )
  }

  public getExperienceHistory(): Observable<Experience[]> {
    return this.getExperiences('Experience');
  }

  public getEducationHistory(): Observable<Experience[]> {
    return this.getExperiences('Education');
  }

  public getSkillList(): Observable<Experience[]> {
    return this.getExperiences('Skill');
  }

  public getBlogs(): Observable<Blog[]> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => this.fetchBlogs())
    );
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

  public createBlog(blog: Blog): void {
    let user = this.dataCollector.users.find(user => user.username == blog.username);
    user.blogs.push(blog);
  }

  public deleteBlog(id: number): void {
    this.dataCollector.users.forEach(user => {
      user.blogs = user.blogs.filter(blog => blog.id !== id);
    });
  }

  private getExperiences(type: String): Observable<Experience[]> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => this.fetchExperiences().pipe(
        switchMap(experiences => of(experiences.filter(experience => experience.type === type)))
      ))
    );
  }

  private fetchExperiences(): Observable<Experience[]> {
    let user = this.dataCollector.users.find(user => user.username == this.userService.getUser().username);
    return of(user.experiences);
  }

  public createExperience(experience: Object): void {
    let user = this.dataCollector.users.find(user => user.username == experience['username']);
    user.experiences.push(experience as Experience);
  }

  public updatePersonalInfo(personalInfo: Object): void {
    // [TODO]
  }

  public deleteExperience(id: number): void {
    this.dataCollector.users.forEach(user => {
      user.experiences = user.experiences.filter(experience => experience.id !== id);
    });
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
