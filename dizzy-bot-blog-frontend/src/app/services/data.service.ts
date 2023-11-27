import { Injectable } from '@angular/core';
import { Observable, catchError, interval, startWith, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Experience } from '../models/experience';
import { PersonalInfo } from '../models/personal-info';
import { Blog } from '../models/blog';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // service configuration
  // [TODO] To be replaced by server-configuration.json
  private rootURL: string = 'assets/mock-data/';

  // about-me data
  private employmentHistoryURL: string = `${this.rootURL}EmploymentHistoryDataBase/employmentHistory.json`;
  private personalInfoURL: string = `${this.rootURL}PersonalInfoDataBase/personalInfo.json`;
  private experienceHistoryURL: string = `${this.rootURL}ExperienceHistoryDataBase/experienceHistory.json`;
  private educationHistoryURL: string = `${this.rootURL}EducationHistoryDataBase/educationHistory.json`;
  private skillListURL: string = `${this.rootURL}SkillListDataBase/skillList.json`;

  // home data
  private blogURL: string = 'http://localhost:8080/blog';
  private experienceURL: string = 'http://localhost:8080/experience';

  constructor(private http: HttpClient, private userService: UserService) { }

  public submit(obj: Object, type: string): void {
    switch (type) {
      case 'Blog':
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');

        obj['username'] = this.userService.getUser().username;
        obj['likes'] = 0;
        obj['date'] = formattedDate;
        this.createBlog(obj as Blog);
        break;
      case 'Experience':
        obj['type'] = 'Experience';
        this.createExperience(obj);
        break;
      case 'Employment':
        obj['type'] = 'Employment';
        this.createExperience(obj);
        break;
      case 'Education':
        obj['type'] = 'Education';
        this.createExperience(obj);
        break;
      default:
        console.log("Unknow type");
    }
  }

  public getEmploymentHistory(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.employmentHistoryURL);
  }

  public getPersonalInfo(): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>(this.personalInfoURL);
  }

  public getExperienceHistory(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.experienceHistoryURL);
  }

  public getEducationHistory(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.educationHistoryURL);
  }

  public getSkillList(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.skillListURL);
  }

  public getBlogs(): Observable<Blog[]> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => this.fetchBlogs())
    );
  }

  private fetchBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogURL + '/getAll');
  }

  public createBlog(blog: Blog): void {
    this.http.post<any>(this.blogURL + '/create', blog).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public getExperiences(): Observable<Experience[]> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => this.fetchExperiences())
    );
  }

  private fetchExperiences(): Observable<Experience[]> {
    return this.http.post<Experience[]>(this.experienceURL + '/getAll', this.userService.getUser().username);
  }

  public createExperience(experience: Object): void {
    this.http.post<any>(this.experienceURL + '/create', experience).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
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
