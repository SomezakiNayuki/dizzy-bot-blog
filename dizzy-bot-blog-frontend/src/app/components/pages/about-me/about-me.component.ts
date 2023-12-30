import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { FormDefinition } from 'src/app/models/form-definition';
import { PersonalInfo } from 'src/app/models/personal-info';
import { DataService } from 'src/app/services/data.service';
import { FormDefinitionService } from 'src/app/services/form-definition.service';
import { UserService } from 'src/app/services/user.service';
import * as label from 'src/app/components/pages/about-me/about-me.label.json';
import { LabelService } from 'src/app/pipes/label.service';
import { ExperienceType } from 'src/app/enumerations/experience.enum';

@Component({
  selector: 'dzb-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  providers: [LabelService]
})
export class AboutMeComponent implements OnInit {

  protected isEditting: boolean = false;

  protected userEducationHistory$: Observable<Experience[]>;
  protected userEmploymentHistory$: Observable<Experience[]>;
  protected userExperienceHistory$: Observable<Experience[]>;
  protected userPersonalInfo$: Observable<PersonalInfo>;
  protected userSkillList$: Observable<Experience[]>;

  protected employmentFormFields: FormDefinition[];
  protected personalInformationFields: FormDefinition[];
  protected skillFields: FormDefinition[];

  constructor(
    private dataService: DataService, 
    private formService: FormDefinitionService,
    private injector: Injector,
    private labelService: LabelService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.isEditting = false;
    this.labelService.loadScreenLabelConfiguration(label);
    this.fetchFormDefinition();
    this.fetchData();
  }

  private fetchData(): void {
    this.userEducationHistory$ = this.dataService.getEducationHistory();
    this.userEmploymentHistory$ = this.dataService.getEmploymentHistory();
    this.userExperienceHistory$ = this.dataService.getExperienceHistory();
    this.userPersonalInfo$ = this.dataService.getPersonalInfo();
    this.userSkillList$ = this.dataService.getSkillList();
  }

  private fetchFormDefinition(): void {
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
    return this.userService.getCashedUser()?.username === this.userService.getCashedHost()?.username;
  }

  protected Education(): Experience {
    let exp = this.getSolidExperienceInstance();
    exp.type = ExperienceType.EDUCATION;
    return exp;
  }

  protected Employment(): Experience {
    let exp = this.getSolidExperienceInstance();
    exp.type = ExperienceType.EMPLOYMENT;
    return exp;
  }

  protected Experience(): Experience {
    let exp = this.getSolidExperienceInstance();
    exp.type = ExperienceType.EXPERIENCE;
    return exp;
  }

  protected Skill(): Experience {
    let exp = this.getSolidExperienceInstance();
    exp.type = ExperienceType.SKILL;
    return exp;
  }

  /* 
    All injectable models are provided in a way similar to services,
    which means all models are in singleton pattern,
    to prevent attribute 'type' being overriden by last instance change,
    a copy of original model instance is needed
  */
  private getSolidExperienceInstance(): Experience {
    let exp = {};
    let sourceExp: Experience = this.getExperienceInstance();
    Object.assign(exp, sourceExp);
    this.copyMethods(sourceExp, exp);
    return exp as Experience;
  }

  private getExperienceInstance(): Experience {
    return this.injector.get(Experience);;
  }

  private copyMethods(source: any, destination: any) {
    const sourcePrototype = Object.getPrototypeOf(source);

    Object.getOwnPropertyNames(sourcePrototype).forEach((methodName) => {
      if (typeof sourcePrototype[methodName] === 'function') {
        destination[methodName] = sourcePrototype[methodName].bind(destination);
      }
    });
  }

  protected PersonalInfo(): PersonalInfo {
    return this.injector.get(PersonalInfo);
  }
  
}
