import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigurationService {

  private HOST: string = 'http://localhost:8080';

  /* ---------------- Blog URL ---------------- */

  private getBlogURL(): string {
    return this.HOST + '/blog';
  }

  public getAllBlogsURL(): string {
    return this.getBlogURL() + '/getAll';
  }

  public getCreateBlogURL(): string {
    return this.getBlogURL() + '/create';
  }

  public getDeleteBlogURL(id: number): string {
    return this.getBlogURL() + '/delete/' + id;
  }

  /* ---------------- Experience URL ---------------- */

  private getExperienceURL(): string {
    return this.HOST + '/experience';
  }

  public getAllExperiencesURL(): string {
    return this.getExperienceURL() + '/getAll';
  }

  public getCreateExperienceURL(): string {
    return this.getExperienceURL() + '/create';
  }

  public getDeleteExperienceURL(id: number): string {
    return this.getExperienceURL() + '/delete/' + id;
  }

  public getUpdatePersonalInfoURL(): string {
    return this.getExperienceURL() + '/updatePersonalInfo';
  }

  public getResetPersonalInfoURL(username: string): string {
    return this.getExperienceURL() + '/resetPersonalInfo/' + username;
  }

  /* ---------------- User URL ---------------- */

  private getUserURL(): string {
    return this.HOST + '/user';
  }

  public getLoginURL(): string {
    return this.getUserURL() + '/login';
  }

  public getRegisterURL(): string {
    return this.getUserURL() + '/register';
  }

  public getUserInfoURL(): string {
    return this.getUserURL() + '/getInfo';
  }

}