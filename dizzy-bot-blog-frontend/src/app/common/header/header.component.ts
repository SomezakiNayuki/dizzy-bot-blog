import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/pipes/label.service';
import { LoginService } from 'src/app/services/login.service';
import { PageNavigationService } from 'src/app/services/page-navigation.service';
import { UserService } from 'src/app/services/user.service';
import * as label from 'src/app/common/header/header.label.json';
import { PageEnum } from 'src/app/enumerations/page.enum';

@Component({
  selector: 'dzb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LabelService]
})
export class HeaderComponent implements OnInit {

  constructor(
    private labelService: LabelService,
    private loginService: LoginService,
    private pageNavigationService: PageNavigationService, 
    private userService: UserService,
  ) {}
  
  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
  }

  protected isAboutMeActive(): string {
    return this.getActiveScreen(PageEnum.ABOUT_ME) ? 'active' : '';
  }

  protected isHomeActive(): string {
    return this.getActiveScreen(PageEnum.HOME) ? 'active' : '';
  }

  private getActiveScreen(page: PageEnum): boolean {
    return this.pageNavigationService.isActive(page);
  }

  protected setAboutMeActive(): void {
    this.userService.fetchUser(this.userService.getCashedHost().username);
    this.pageNavigationService.setActive(PageEnum.ABOUT_ME);
  }

  protected setHomeActive(): void {
    this.pageNavigationService.setActive(PageEnum.HOME);
  }

  protected isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  protected login(): void {
    this.loginService.openLoginModal();
  }

  protected logout(): void {
    this.loginService.logout();
    this.setHomeActive();
  }

}
