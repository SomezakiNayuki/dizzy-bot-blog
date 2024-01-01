import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { FormDefinition } from 'src/app/models/form-definition';
import { LabelService } from 'src/app/pipes/label.service';
import { DataService } from 'src/app/services/data.service';
import { FormDefinitionService } from 'src/app/services/form-definition.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import * as label from 'src/app/components/pages/home/home.label.json';
import { SubmitablFactory } from 'src/app/factories/submitable.factory';

@Component({
  selector: 'dzb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LabelService]
})
export class HomeComponent {

  protected blogs$: Observable<Blog[]>;
  protected filtered: boolean = false;
  protected formFields: FormDefinition[];

  constructor(
    private dataService: DataService, 
    private formService: FormDefinitionService,
    private labelService: LabelService,
    private loginService: LoginService, 
    private submitableFactory: SubmitablFactory,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.filtered = false;
    this.labelService.loadScreenLabelConfiguration(label);
    this.fetchFormDefinition();
    this.fetchData();
  }

  private fetchData(): void {
    this.blogs$ = this.dataService.getBlogs();
  }

  private fetchFormDefinition(): void {
    this.formService.getBlogFormDefinitions().subscribe(formFields => {
      this.formFields = formFields;
    });
  }

  protected isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  protected filterMyBlogs(): void {
    this.filtered = true;

    this.blogs$ = this.dataService.getBlogs()
    .pipe(
      map(blogs => blogs.filter(blog => blog.username === this.userService.getCashedHost()?.username)),
    );
  }

  protected Blog(): Blog {
    return this.submitableFactory.getBlogInstance();
  }

}
