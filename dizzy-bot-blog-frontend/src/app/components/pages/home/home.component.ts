import { Component } from "@angular/core";
import { Observable, map } from "rxjs";
import { Blog } from "src/app/models/blog";
import { FormDefinition } from "src/app/models/form-definition";
import { DataService } from "src/app/services/data.service";
import { FormDefinitionService } from "src/app/services/form-definition.service";
import { LoginService } from "src/app/services/login.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'dzb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // functional variables
  protected isManaging: boolean = false;

  // observables
  protected blogs$: Observable<Blog[]>;

  // form definition for creating blog
  protected formFields: FormDefinition[];

  constructor(
    private dataService: DataService, 
    private loginService: LoginService, 
    private formService: FormDefinitionService,
    private userService: UserService
    ) { }

  public ngOnInit(): void {
    this.isManaging = false;
    this.blogs$ = this.dataService.getBlogs();

    this.formService.getBlogFormDefinitions().subscribe(formFields => {
      this.formFields = formFields;
    });
  }

  protected isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

  protected manageMyBlogs(): void {
    this.isManaging = true;
    this.blogs$ = this.dataService.getBlogs().pipe(
      map(blogs => blogs.filter(blog => blog.username === this.userService.getUser().username)),
    );
  }

}
