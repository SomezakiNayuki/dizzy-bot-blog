import { Injectable } from '@angular/core';
import { Observable, catchError, interval, of, startWith, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Experience } from 'src/app/models/experience';
import { PersonalInfo } from 'src/app/models/personal-info';
import { Blog } from 'src/app/models/blog';
import { UserService } from 'src/app/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // service configuration
  // [TODO] To be replaced by server-configuration.json
  private rootURL: string = 'assets/mock-data/';

  // home data
  private blogURL: string = 'http://localhost:8080/blog';
  private experienceURL: string = 'http://localhost:8080/experience';

  constructor(private http: HttpClient, private userService: UserService) { }

  public submit(obj: Object, type: string): void {
    switch (type) {
      case 'Blog':
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');

        obj['username'] = this.userService.getCashedHost().username;
        obj['likes'] = 0;
        obj['date'] = formattedDate;
        this.createBlog(obj as Blog);
        break;
      case 'Experience':
        obj['type'] = 'Experience';
        obj['username'] = this.userService.getCashedHost().username;
        this.createExperience(obj);
        break;
      case 'Employment':
        obj['type'] = 'Employment';
        obj['username'] = this.userService.getCashedHost().username;
        this.createExperience(obj);
        break;
      case 'Education':
        obj['type'] = 'Education';
        obj['username'] = this.userService.getCashedHost().username;
        this.createExperience(obj);
        break;
      case 'Skill':
        obj['type'] = 'Skill';
        obj['username'] = this.userService.getCashedHost().username;
        this.createExperience(obj);
        break;
      case 'PersonalInfo':
        obj['username'] = this.userService.getCashedHost().username;
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
        this.userService.fetchUser(this.userService.getCashedUser().username);
        let personalInfo: PersonalInfo = {
          username: this.userService.getCashedUser().username,
          userEmail: this.userService.getCashedUser().email,
          userLinkedInUrl: this.userService.getCashedUser().linkedInURL,
          userPhoneNumber: this.userService.getCashedUser().phone,
          userAcademicDegree: undefined,
          userAcademicDescription1: undefined,
          userAcademicDescription2: undefined,
          userUniversity: this.userService.getCashedUser().university
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
    return this.http.get<Blog[]>(this.blogURL + '/getAll');
  }

  public createBlog(blog: Blog): void {
    this.http.post<any>(this.blogURL + '/create', blog).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public deleteBlog(id: number): void {
    this.http.delete(this.blogURL + '/delete/' + id).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  private getExperiences(type: string): Observable<Experience[]> {
    return interval(1000).pipe(
      startWith(0),
      switchMap(() => this.fetchExperiences().pipe(
        switchMap(experiences => of(experiences.filter(experience => experience.type === type)))
      ))
    );
  }

  private fetchExperiences(): Observable<Experience[]> {
    return this.http.post<Experience[]>(this.experienceURL + '/getAll', { username: this.userService.getCashedUser().username });
  }

  public createExperience(experience: Object): void {
    this.http.post<any>(this.experienceURL + '/create', experience).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public updatePersonalInfo(personalInfo: Object): void {
    this.http.post<any>(this.experienceURL + '/updatePersonalInfo', personalInfo).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public deleteExperience(id: number): void {
    this.http.delete(this.experienceURL + '/delete/' + id).pipe(
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
