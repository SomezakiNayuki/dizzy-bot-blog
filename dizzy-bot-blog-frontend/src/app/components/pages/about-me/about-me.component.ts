import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Experience } from "src/app/models/experience";
import { FormDefinition } from "src/app/models/form-definition";
import { PersonalInfo } from "src/app/models/personal-info";
import { DataService } from "src/app/services/data.service";
import { FormDefinitionService } from "src/app/services/form-definition.service";
import { LoginService } from "src/app/services/login.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'dzb-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  /* [TODO] about-me page should be visible for other users as well in the future,
     for visitor, edit-cancel button shouldn't be visible and thus creating button either
     It is designed to be accessible by clicking "author" at each blog item
  */

  // observables
  protected userPersonalInfo$: Observable<PersonalInfo>;
  protected userEmploymentHistory$: Observable<Experience[]>;
  protected userExperienceHistory$: Observable<Experience[]>;
  protected userEducationHistory$: Observable<Experience[]>;
  protected userSkillList$: Observable<Experience[]>;

  // functional variables
  protected isEditting: boolean = false;

  // form definition for creating about-me page
  protected employmentFormFields: FormDefinition[];
  protected personalInformationFields: FormDefinition[];
  protected skillFields: FormDefinition[];

  constructor(
    private dataService: DataService, 
    private formService: FormDefinitionService, 
    private loginService: LoginService,
    private userService: UserService
    ) { }

  public ngOnInit(): void {
    this.isEditting = false;

    this.userPersonalInfo$ = this.dataService.getPersonalInfo();
    this.userEmploymentHistory$ = this.dataService.getEmploymentHistory();
    this.userExperienceHistory$ = this.dataService.getExperienceHistory();
    this.userEducationHistory$ = this.dataService.getEducationHistory();
    this.userSkillList$ = this.dataService.getSkillList();

    this.formService.getEmploymentFormDefinitions().subscribe(formFields => {
      this.employmentFormFields = formFields;
    });
    this.formService.getPersonalInformationFormDefinitions().subscribe(formFields => {
      this.personalInformationFields = formFields;
    });
    this.formService.getSkillFormDefinitions().subscribe(formFields => {
      this.skillFields = formFields;
    })
  }

  protected edit(): void {
    this.ngOnInit();
    this.isEditting = true;
  }

  protected cancel(): void {
    this.isEditting = false;
  }

  protected isHost(): boolean {
    return this.loginService.getIsLoggedIn() && this.userService.getUser()?.username === this.userService.getHost()?.username;
  }
  
}
