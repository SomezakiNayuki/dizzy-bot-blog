import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageNavigationService {

  // functional variables
  private isAboutMeActive: boolean = false;
  private isHomeActive: boolean = true;

  constructor() { }

  private init(): void {
    this.isAboutMeActive = false;
    this.isHomeActive = false;
  }

  public setActive(screen: string): void {
    switch (screen) {
      case 'AboutMe': {
        this.init();
        this.isAboutMeActive = true;
        break;
      }
      case 'Home': {
        this.init();
        this.isHomeActive = true;
        break;
      }
      default: {
        break;
      }
    }
  }

  public isActive(screen: string): boolean {
    switch (screen) {
      case 'AboutMe': {
        return this.isAboutMeActive;
      }
      case 'Home': {
        return this.isHomeActive;
      }
      default: {
        return false;
      }
    }
  }

}
