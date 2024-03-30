import { Injectable } from '@angular/core';
import { PageEnum } from 'src/app/enumerations/page.enum';

@Injectable({
  providedIn: 'root'
})
export class PageNavigationService {

  private activeScreen: PageEnum = PageEnum.HOME;

  constructor() { }

  public setActive(screen: PageEnum): void {
    switch (screen) {
      case PageEnum.ABOUT_ME: {
        this.activeScreen = PageEnum.ABOUT_ME;
        break;
      }
      case PageEnum.HOME: {
        this.activeScreen = PageEnum.HOME;
        break;
      }
      case PageEnum.ARCHIVE: {
        this.activeScreen = PageEnum.ARCHIVE;
        break;
      }
      default: {
        this.activeScreen = PageEnum.HOME;
        break;
      }
    }
  }

  public isActive(screen: PageEnum): boolean {
    return screen === this.activeScreen;
  }

}
