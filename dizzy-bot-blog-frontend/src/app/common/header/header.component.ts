import { Component } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { PageNavigationService } from "src/app/services/page-navigation.service";
import { UserService } from "src/app/services/user.service";
declare var $: any;

@Component({
  selector: 'dzb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // screen contents
  protected blogTitle: string = 'DIZZY BOT BLOG';
  protected searchBoxPlaceHolder: string = 'search...';

  constructor(private pageNavigationService: PageNavigationService, private loginService: LoginService, private userService: UserService) { }

  protected switchAboutMeActive(): void {
    this.userService.fetchUser(this.userService.getHost().username);
    this.pageNavigationService.setActive('AboutMe');
  }

  protected switchHomeActive(): void {
    this.pageNavigationService.setActive('Home');
  }

  protected isAboutMeActive(): boolean {
    return this.pageNavigationService.isActive('AboutMe');
  }

  protected isHomeActive(): boolean {
    return this.pageNavigationService.isActive('Home');
  }

  protected isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

  protected login(): void {
    // [TODO] To be moved into pageNavigationService for consistency
    $('#loginModal').modal('show');
    this.loginService.reinitLoginModal();
  }

  protected logout(): void {
    // [TODO] To be moved into pageNavigationService for consistency
    this.loginService.logout();
    this.loginService.reinitLoginModal();
    this.switchHomeActive();
  }

}
