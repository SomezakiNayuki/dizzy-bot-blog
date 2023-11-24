import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Experience } from "src/app/models/experience";
import { FormDefinition } from "src/app/models/form-definition";
import { PersonalInfo } from "src/app/models/personal-info";
import { DataService } from "src/app/services/data.service";
import { FormDefinitionService } from "src/app/services/form-definition.service";

@Component({
  selector: 'dzb-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  // observables
  protected userPersonalInfo$: Observable<PersonalInfo>;
  protected userEmploymentHistory$: Observable<Experience[]>;
  protected userExperienceHistory$: Observable<Experience[]>;
  protected userEducationHistory$: Observable<Experience[]>;
  protected userSkillList$: Observable<Experience[]>;

  // form definition for creating blog
  protected employmentFormFields: FormDefinition[];

  constructor(private dataService: DataService, private formService: FormDefinitionService) { }

  public ngOnInit(): void {
    this.userPersonalInfo$ = this.dataService.getPersonalInfo();
    this.userEmploymentHistory$ = this.dataService.getEmploymentHistory();
    this.userExperienceHistory$ = this.dataService.getExperienceHistory();
    this.userEducationHistory$ = this.dataService.getEducationHistory();
    this.userSkillList$ = this.dataService.getSkillList();

    this.formService.getEmploymentFormDefinitions().subscribe(formFields => {
      this.employmentFormFields = formFields;
    });
  }
  
}
