import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/models/personal-info';
import { LabelService } from 'src/app/pipes/label.service';
import * as label from 'src/app/components/components/personal-info-card/personal-info-card.label.json';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'dzb-personal-info-card',
  templateUrl: './personal-info-card.component.html',
  styleUrls: ['./personal-info-card.component.css'],
  providers: [LabelService]
})
export class PersonalInfoCardComponent implements OnInit {

  @Input() public personalInfo: PersonalInfo;
  @Input() public isEditting: boolean;

  constructor(
    private dataService: DataService,
    private labelService: LabelService
  ) {}

  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
  }

  protected delete(username: string): void {
    this.dataService.resetPersonalInfo(username);
  }

}
