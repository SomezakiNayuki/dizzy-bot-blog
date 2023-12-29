import { Component } from '@angular/core';
import { PageNavigationService } from './services/page-navigation.service';
import { PageEnum } from 'src/app/enumerations/page.enum';

@Component({
  selector: 'dzb-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // screen contents
  protected title: string = 'DIZZY BOT BLOG';

  constructor(private pageNavigationService: PageNavigationService) { }

  protected isAboutMeActive(): boolean {
    return this.pageNavigationService.isActive(PageEnum.ABOUT_ME);
  }

  protected isHomeActive(): boolean {
    return this.pageNavigationService.isActive(PageEnum.HOME);
  }

}
