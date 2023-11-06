import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../models/experience';
import { PersonalInfo } from '../models/personal-info';
import { Blog } from '../models/blog';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // service configuration
  private rootURL: string = 'assets/mock-data/';

  // about-me data
  private employmentHistoryURL: string = `${this.rootURL}EmploymentHistoryDataBase/employmentHistory.json`;
  private personalInfoURL: string = `${this.rootURL}PersonalInfoDataBase/personalInfo.json`;
  private experienceHistoryURL: string = `${this.rootURL}ExperienceHistoryDataBase/experienceHistory.json`;
  private educationHistoryURL: string = `${this.rootURL}EducationHistoryDataBase/educationHistory.json`;
  private skillListURL: string = `${this.rootURL}SkillListDataBase/skillList.json`;

  // home data
  private blogURL: string = `${this.rootURL}BlogDataBase/blogs.json`;

  constructor(private http: HttpClient) { }

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
    return this.http.get<Blog[]>(this.blogURL);
  }

}
