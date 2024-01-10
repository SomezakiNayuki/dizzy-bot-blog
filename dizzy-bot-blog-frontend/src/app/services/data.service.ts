import { Injectable } from '@angular/core';
import { Observable, catchError, interval, of, startWith, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Experience } from 'src/app/models/experience';
import { PersonalInfo } from 'src/app/models/personal-info';
import { Blog } from 'src/app/models/blog';
import { UserService } from 'src/app/services/user.service';
import { Submitable } from 'src/app/models/submitable';
import { ExperienceType } from 'src/app/enumerations/experience.enum';
import { ServerConfigurationService } from 'src/app/services/server-configuration.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient, 
    private serverConfigService: ServerConfigurationService,
    private userService: UserService
  ) {}

  public submit(submitable: Submitable): void {
    submitable.submit();
  }

  public createBlog(blog: Object): void {
    this.http.post<any>(this.serverConfigService.getCreateBlogURL(), blog).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public deleteBlog(id: number): void {
    this.http.delete(this.serverConfigService.getDeleteBlogURL(id)).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public getBlogs(): Observable<Blog[]> {
    return this.continuallyFetch<Blog[]>(1000, () => this.fetchBlogs());
  }

  private fetchBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.serverConfigService.getAllBlogsURL());
  }

  public archiveBlog(id: number): void {
    const headers = new HttpHeaders().set('username', this.userService.getCashedHost().username);
    this.http.get<void>(this.serverConfigService.getArchiveBlogURL(id), { headers: headers }).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe(() => {
      this.userService.fetchHost(this.userService.getCashedHost().username);
    });
  }

  public removeArchivedBlog(id: number): void {
    const headers = new HttpHeaders().set('username', this.userService.getCashedHost().username);
    this.http.delete<void>(this.serverConfigService.getRemoveArchiveBlogURL(id), { headers: headers }).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe(() => {
      this.userService.fetchHost(this.userService.getCashedHost().username);
    });
  }

  public createExperience(experience: Object): void {
    this.http.post<any>(this.serverConfigService.getCreateExperienceURL(), experience).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public deleteExperience(id: number): void {
    this.http.delete(this.serverConfigService.getDeleteExperienceURL(id)).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
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
    const headers = new HttpHeaders().set('username', this.userService.getCashedUser().username);
    return this.http.get<Experience[]>(this.serverConfigService.getAllExperiencesURL(), { headers: headers });
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
    this.http.post<any>(this.serverConfigService.getUpdatePersonalInfoURL(), personalInfo).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
  }

  public resetPersonalInfo(): void {
    const headers = new HttpHeaders().set('username', this.userService.getCashedUser().username);
    this.http.delete<any>(this.serverConfigService.getResetPersonalInfoURL(), { headers: headers }).pipe(
      catchError(this.serverErrorHandler),
    ).subscribe();
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
