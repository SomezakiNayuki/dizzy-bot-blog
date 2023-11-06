import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Blog } from "src/app/models/blog";
import { DataService } from "src/app/services/data.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'dzb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // observables
  protected blogs$: Observable<Blog[]>;

  constructor(private dataService: DataService, private loginService: LoginService) { }

  public ngOnInit(): void {
    this.blogs$ = this.dataService.getBlogs();
  }

  protected isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

}
