import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/models/personal-info';
import { LabelService } from 'src/app/pipes/label.service';
import * as label from 'src/app/components/components/personal-info-card/personal-info-card.label.json';

@Component({
  selector: 'dzb-personal-info-card',
  templateUrl: './personal-info-card.component.html',
  styleUrls: ['./personal-info-card.component.css'],
  providers: [LabelService]
})
export class PersonalInfoCardComponent implements OnInit {

  @Input() public personalInfo: PersonalInfo;

  constructor(
    private labelService: LabelService
  ) {}

  public ngOnInit(): void {
    this.labelService.loadScreenLabelConfiguration(label);
  }

}
