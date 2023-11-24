import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Blog } from "src/app/models/blog";
import { FormDefinition } from "src/app/models/form-definition";
import { DataService } from "src/app/services/data.service";
import { FormDefinitionService } from "src/app/services/form-definition.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'dzb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // observables
  protected blogs$: Observable<Blog[]>;

  // form definition for creating blog
  protected formFields: FormDefinition[];

  constructor(private dataService: DataService, private loginService: LoginService, private formService: FormDefinitionService) { }

  public ngOnInit(): void {
    this.blogs$ = this.dataService.getBlogs();

    this.formService.getBlogFormDefinitions().subscribe(formFields => {
      this.formFields = formFields;
    });
  }

  protected isLoggedIn(): boolean {
    return this.loginService.getIsLoggedIn();
  }

}
